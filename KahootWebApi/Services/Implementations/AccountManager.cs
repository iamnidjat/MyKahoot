using Microsoft.EntityFrameworkCore;
using MimeKit;
using Microsoft.AspNetCore.Mvc;
using KahootWebApi.Models;
using BCrypt.Net;
using BC = BCrypt.Net.BCrypt;
using KahootWebApi.Services.Interfaces;
using KahootWebApi.Models.DTOs;

namespace KahootWebApi.Services.Implementations
{
    public class AccountManager : IAccountManager
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<AccountManager> _logger;
        private readonly IWebHostEnvironment _environment;

        public AccountManager(KahootDbContext context, ILogger<AccountManager> logger, IWebHostEnvironment environment) 
        {
            _context = context;
            _logger = logger;
            _environment = environment;
        }

        public async Task AddSocialUserAsync(SocialUser socialUser)
        {
            try
            {
                // Check if the user already exists
                User? existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == socialUser.Username && u.Email == socialUser.Email);

                if (existingUser == null)
                {
                    // Create and save the new User
                    var newUser = new User
                    {
                        Username = socialUser.Username,
                        Name = socialUser.Name,
                        Email = socialUser.Email,
                        Role = socialUser.Role,
                        Provider = socialUser.Provider
                    };

                    await _context.Users.AddAsync(newUser);
                    await _context.SaveChangesAsync();

                    // Set the UserId in the SocialUser entity
                    socialUser.UserId = newUser.Id;

                    // Add the new SocialUser
                    await _context.SocialUsers.AddAsync(socialUser);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    // Optionally handle the case where the user already exists
                    _logger.LogInformation("User already exists.");
                }
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the AddSocialUser method.");
            }
        }

        public async Task<bool> PasswordsMatchingAsync(int userId, string password)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);

                if (user != null && BC.EnhancedVerify(password, user.Password, HashType.SHA512))
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex) when (ex is OperationCanceledException or InvalidOperationException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the PasswordsMatching method.");
                return false;
            }
        }

        public async Task<bool> CheckStatusOfAccAsync(int userId)
        {
            try
            {
                return await GetFrozenAccAsync(userId) != null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the CheckStatusOfAccAsync method.");
                return false;
            }
        }

        public async Task FreezeAccAsync(int userId, string reason)
        {
            try
            {
                var user = await GetAccByIdAsync(userId);

                var stats = await GetQuizStatsByIdAsync(userId);

                if (user != null)
                {
                    user.IsFrozen = true;

                    user.FreezingReason = reason;

                    foreach (var stat in stats)
                    {
                        stat!.IsVisible = false;
                    }

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex) when (ex is DbUpdateConcurrencyException or DbUpdateException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the FreezeAccAsync method.");
            }
        }

        public async Task UnfreezeAccAsync(int userId)
        {
            try
            {
                var user = await GetAccByIdAsync(userId);

                var stats = await GetQuizStatsByIdAsync(userId);

                if (user != null)
                {
                    user.IsFrozen = false;

                    foreach(var stat in stats)
                    {
                        stat!.IsVisible = true;
                    }

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex) when (ex is DbUpdateConcurrencyException or DbUpdateException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the UnfreezeAccAsync method.");
            }
        }

        public async Task DeleteAccAsync(int userId, DeletedAccount deletedAccount)
        {
            try
            {
                var user = await GetAccByIdAsync(userId);

                var stats = await GetQuizStatsByIdAsync(userId);

                var sUser = await _context.SocialUsers.SingleOrDefaultAsync(x => x.UserId == userId);

                if (user != null) // && stats != null
                {
                    _context.Users.Remove(user);

                    _context.Quizzes.RemoveRange(stats);

                    await _context.DeletedAccounts.AddAsync(deletedAccount);

                    if (sUser != null)
                    {
                        _context.SocialUsers.Remove(sUser);
                    }

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex) when (ex is DbUpdateConcurrencyException or DbUpdateException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the DeleteAccAsync method.");
            }
        }

        private async Task<User?> GetAccByIdAsync(int? userId)
        {
            if (userId == null)
            {
                return null;
            }

            try
            {
                return await _context.Users.SingleOrDefaultAsync(x => x.Id == userId);
            }
            catch (Exception ex) when (ex is ArgumentException or ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the GetAccByIdAsync method.");
                return null;
            }
        }

        private async Task<IEnumerable<QuizStat?>> GetQuizStatsByIdAsync(int? userId)
        {
            if (userId == null)
            {
                return Enumerable.Empty<QuizStat>();
            }

            try
            {
                return await _context.Quizzes.Where(x => x.UserId == userId).ToListAsync();
            }
            catch (Exception ex) when (ex is ArgumentException or ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the GetQuizStatsByIdAsync method.");
                return Enumerable.Empty<QuizStat>();
            }
        }

        private async Task<User?> GetFrozenAccAsync(int userId)
        {
            try
            {
                return await _context.Users.FirstOrDefaultAsync(x => x.Id == userId && x.IsFrozen == true);
            }
            catch (Exception ex) when (ex is ArgumentException or ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the GetFrozenAccAsync method.");
                return null;
            }
        }

        private static string RandomPasswordGenerator(int length)
        {
            //try
            //{
                byte[] result = new byte[length];

                for (int index = 0; index < length; index++)
                {
                    result[index] = (byte)new Random().Next(33, 126);
                }

                return System.Text.Encoding.ASCII.GetString(result);
            //}
            //catch (Exception ex) when (ex is ArgumentException or ArgumentNullException or ArgumentOutOfRangeException)
            //{
            //    throw new Exception(ex.Message, ex);
            //}
        }

        private static int RandomPasswordLength() // No need for try catch here
        {
            var number = new Random().Next(5, 10);

            return number;
        }

        public async Task<IActionResult> ResetPasswordAsync(string email)
        {
            var newPassword = RandomPasswordGenerator(RandomPasswordLength());
           
            using var smtpClient = new MailKit.Net.Smtp.SmtpClient();

            if (Validators.IsEmailValid(email))
            {
                try
                {
                    smtpClient.Connect("smtp.gmail.com", 465, MailKit.Security.SecureSocketOptions.Auto);
                    smtpClient.Authenticate(ApplicationDatas.FirstMail, ApplicationDatas.Password);

                    var message = new MimeMessage();

                    message.From.Add(new MailboxAddress("MyKahoot", ApplicationDatas.FirstMail));
                    message.To.Add(new MailboxAddress("You", email));

                    message.Subject = "Reset Password";

                    var part = new TextPart("plain")
                    {
                        Text = $"Your new password: {newPassword}\nIf the message was sent by mistake, just ignore it."
                    };

                    message.Body = part;

                    smtpClient.Send(message);

                    var user = await _context.Users.Where(x => x.Email == email).FirstOrDefaultAsync();

                    if (user != null)
                    {
                        user.Password = BC.EnhancedHashPassword(newPassword, 13, HashType.SHA512);

                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        return new StatusCodeResult(400);
                    }
                }
                catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
                {
                    _logger.LogError(ex, "An error occurred in the ResetPasswordAsync method.");
                    return new StatusCodeResult(500);
                }
                finally
                {
                    smtpClient.Disconnect(true);
                }

                return new StatusCodeResult(200);
            }

            _logger.LogError("Mail is not valid.");
            return new StatusCodeResult(400);
        }

        public async Task<IActionResult> ChangePasswordAsync(string login, string oldPassword, string newPassword)
        {
            try
            {
                var password = await _context.Users.Where(x => x.Username == login).FirstOrDefaultAsync();

                if (password != null && BC.EnhancedVerify(oldPassword, password.Password, HashType.SHA512))
                {
                    password.Password = BC.EnhancedHashPassword(newPassword, 13, HashType.SHA512); ;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    return new StatusCodeResult(400);
                }

                return new StatusCodeResult(200);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the ChangePasswordAsync method.");
                return new StatusCodeResult(500);
            }
        }

        public async Task<IActionResult> ChangeBirthdayAsync(string login, DateTime newBirthday)
        {
            try
            {
                var birthday = await _context.Users.Where(x => x.Username == login).FirstOrDefaultAsync();

                if (birthday != null)
                {
                    birthday.Birthday = newBirthday;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    return new StatusCodeResult(400);
                }

                return new StatusCodeResult(200);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the ChangeBirthdayAsync method.");
                return new StatusCodeResult(500);
            }
        }

        public string RandomLoginGenerator()
        {
            try
            {
                Random rand = new ();

                string[] consonants = { "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "l", "n", "p", "q", "r", "s", "t", "v", "w", "x" };
                string[] vowels = { "a", "e", "i", "o", "u", "y" };
                int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

                string userName = "";
                userName += consonants[rand.Next(consonants.Length)].ToUpper();
                userName += vowels[rand.Next(vowels.Length)];

                int counter = 2;

                if (rand.Next(1, 3) == 1)
                {
                    while (counter < RandomPasswordLength())
                    {
                        userName += consonants[rand.Next(consonants.Length)];
                        counter++;

                        userName += vowels[rand.Next(vowels.Length)];
                        counter++;
                    }
                }
                else
                {
                    while (counter < RandomPasswordLength() - 2)
                    {
                        userName += consonants[rand.Next(consonants.Length)];
                        counter++;

                        userName += vowels[rand.Next(vowels.Length)];
                        counter++;
                    }

                    for (int i = 0; i < 2; i++)
                    {
                        userName += nums[rand.Next(nums.Length)];
                        counter++;
                    }
                }

                return userName;
            }
            catch (ArgumentOutOfRangeException ex)
            {
                _logger.LogError(ex, "An error occurred in the RandomLoginGenerator method.");
                return string.Empty;
            }
        }

        public async Task AddUserPhotoAsync(UserPhotoDto userPhotoDto, int userId)
        {
            var uploadPath = Path.Combine(_environment.ContentRootPath, "userPhotos");

            // Ensure the upload directory exists
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if (userPhotoDto.Photo != null)
                {
                    var uniqueFileName = $"{Guid.NewGuid()}_{userPhotoDto.Photo.FileName}";
                    var photoPath = Path.Combine(_environment.ContentRootPath, "userPhotos", uniqueFileName);
                    using (var stream = new FileStream(photoPath, FileMode.Create))
                    {
                        await userPhotoDto.Photo.CopyToAsync(stream);
                    }
                    user.Photo = $"/userPhotos/{uniqueFileName}";
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the AddUserPhotoAsync method.");
            }
        }
    }
}
