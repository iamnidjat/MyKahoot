using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace KahootWebApi.Services.Implementations
{
    public class AdminManager : IAdminManager
    {
        private readonly KahootDbContext _context;
        private readonly IAccountManager _manager;
        private readonly ILogger<AdminManager> _logger;
        private readonly IWebHostEnvironment _environment;

        public AdminManager(KahootDbContext context, IAccountManager manager,
            ILogger<AdminManager> logger, IWebHostEnvironment environment)
        {
            _context = context;
            _manager = manager;
            _logger = logger;
            _environment = environment;

        }

        public async Task<string> SendCredentialsAsync(string email)
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
                }
                catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
                {
                    _logger.LogError(ex, "An error occurred in the SendCredentialsAsync method.");
                    return string.Empty;
                }
                finally
                {
                    smtpClient.Disconnect(true);
                }

                return newPassword;
            }

            _logger.LogWarning("Mail is not valid.");
            return string.Empty;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            try
            {
                return await _context.Users.ToListAsync(); 
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetAllUsers method.");
                return Enumerable.Empty<User>();
            }
        }

        public async Task<IEnumerable<User>> GetAllBannedUsersAsync()
        {
            try
            {
                return await _context.Users.Where(u => u.IsBanned).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetAllBannedUsersAsync method.");
                return Enumerable.Empty<User>();
            }
        }

        public async Task<IEnumerable<CreatedQuiz>> GetAllQuizzesAsync()
        {
            try
            {
                return await _context.CreatedQuizzes.ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetAllQuizzes method.");
                return Enumerable.Empty<CreatedQuiz>();
            }
        }

        public async Task BanUserAsync(int userId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

                if (user != null)
                {
                    user.IsBanned = true;
                    user.BannedDate = DateTime.Now;
                }

                await _context.SaveChangesAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the BanUserAsync method.");
            }
        }

        public async Task<bool> IsUserBannedAsync(int userId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                return user?.IsBanned ?? false;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the BanUserAsync method.");
                return false;
            }
        }

        public async Task<ResultModel> UnbanUserAsync(int userId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

                if (user != null)
                {
                    if (DateTime.Now - user.BannedDate.Value >= TimeSpan.FromDays(2))
                    {
                        user.IsBanned = false;
                        user.BannedDate = null;

                        await _context.SaveChangesAsync();

                        return new ResultModel { 
                            Success = true
                        };
                    }
                    else
                    {
                        _logger.LogWarning($"2 days have not yet expired for the user with the {userId} userId");
                        return new ResultModel
                        {
                            Success = false,
                            Reason = "not_expired"
                        };
                    }
                }
                return new ResultModel
                {
                    Success = false,
                    Reason = "user_not_found"
                };
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the UnbanUserAsync method.");
                return new ResultModel
                {
                    Success = false,
                    Reason = "server_error"
                };
            }
        }

        public async Task DeleteQuizAsync(int quizId)
        {
            try
            {
                var quiz = await _context.CreatedQuizzes.FirstOrDefaultAsync(u => u.Id == quizId);

                if (quiz != null)
                {
                    _context.CreatedQuizzes.Remove(quiz);
                }

                await _context.SaveChangesAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the DeleteQuiz method.");
            }
        }

        private static int RandomPasswordLength()
        {
            var number = new Random().Next(5, 10);

            return number;
        }

        private static string RandomPasswordGenerator(int length)
        {
            byte[] result = new byte[length];

            for (int index = 0; index < length; index++)
            {
                result[index] = (byte)new Random().Next(33, 126);
            }

            return System.Text.Encoding.ASCII.GetString(result);
        }

        public async Task<IActionResult> SendMessageToEmailAsync(string email, string title, string body)
        {
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

                    message.Subject = $"{title}";

                    var part = new TextPart("plain")
                    {
                        Text = $"{body}"
                    };

                    message.Body = part;

                    smtpClient.Send(message);
                }
                catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
                {
                    return new StatusCodeResult(400);
                }
                finally
                {
                    smtpClient.Disconnect(true);
                }

                return new StatusCodeResult(200);
            }

            return new StatusCodeResult(400);
        }

        public async Task AddItemToStoreAsync(ItemToBuyDto itemDto)
        {
            var uploadPath = Path.Combine(_environment.ContentRootPath, "itemPhotos");

            // Ensure the upload directory exists
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }
            try
            {
                var item = new ItemToBuy
                {
                    Name = itemDto.Name,
                    Description = itemDto.Description,
                    Quantity = itemDto.Quantity,
                    Price = itemDto.Price,
                };

                if (itemDto.Photo != null)
                {
                    var uniqueFileName = $"{Guid.NewGuid()}_{itemDto.Photo.FileName}";
                    var photoPath = Path.Combine(_environment.ContentRootPath, "itemPhotos", uniqueFileName);
                    using (var stream = new FileStream(photoPath, FileMode.Create))
                    {
                        await itemDto.Photo.CopyToAsync(stream);
                    }
                    item.Photo = $"/itemPhotos/{uniqueFileName}";
                }

                await _context.ItemToBuys.AddAsync(item);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the AddItemToStoreAsync method.");
            }
        }

        public async Task RemoveItemFromStoreAsync(int itemId)
        {
            try
            {
                var item = await _context.ItemToBuys.FindAsync(itemId);

                if (item != null)
                {
                    _context.ItemToBuys.Remove(item);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogWarning("Item with ID {ItemId} not found.", itemId);
                }
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the RemoveItemFromStoreAsync method.");
            }
        }     
    }
}
