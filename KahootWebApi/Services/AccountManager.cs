using System.Net;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using KahootWebApi.Models;
using BCrypt.Net;
using BC = BCrypt.Net.BCrypt;

namespace KahootWebApi.Services
{
    public class AccountManager : IAccountManager
    {
        private readonly KahootDbContext _context;

        public AccountManager(KahootDbContext context) 
        {
            _context = context;
        }

        public async Task AddSocialUser(SocialUser socialUser)
        {
            try
            {
                User? user = await _context.Users.FirstOrDefaultAsync(u => u.Username == socialUser.Username); // !

                if (user == null)
                {
                    await _context.SocialUsers.AddAsync(socialUser);

                    await _context.Users.AddAsync(new User
                    {
                        Username = socialUser.Username,
                        Name = socialUser.Name,
                        Email = socialUser.Email,
                        Role = socialUser.Role,
                        Provider = socialUser.Provider
                    });

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<bool> PasswordsMatching(int userId, string password)
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
                throw new Exception(ex.Message, ex);
            }
        }

        //public async Task SendingNotificationAsync(string username, string email)
        //{
        //    var user = await GetFrozenAccAsync(username);

        //    if (user != null)
        //    {
        //        if (DateTime.Now.Subtract((DateTime)user.DateOfFreezing).Days == 1)
        //        {
        //            NotifyingAboutDeletingAsync(email);
        //        }
        //    }
        //}

        //public async Task<IActionResult> NotifyingAboutDeletingAsync(string email) // !
        //{
        //    using var smtpClient = new MailKit.Net.Smtp.SmtpClient();

        //    if (Validators.IsEmailValid(email))
        //    {
        //        try
        //        {
        //            smtpClient.Connect("smtp.gmail.com", 465, MailKit.Security.SecureSocketOptions.Auto);
        //            smtpClient.Authenticate(ApplicationDatas.FirstMail, ApplicationDatas.Password);

        //            var message = new MimeMessage();

        //            message.From.Add(new MailboxAddress("MyKahoot", ApplicationDatas.FirstMail));
        //            message.To.Add(new MailboxAddress("You", email));

        //            message.Subject = "Notification about account";

        //            var part = new TextPart("plain")
        //            {
        //                Text = $"Only 1 day left before your account will be deleted"
        //            };

        //            message.Body = part;

        //            smtpClient.Send(message);
        //        }
        //        catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
        //        {
        //            return new StatusCodeResult(400);
        //        }
        //        finally
        //        {
        //            smtpClient.Disconnect(true);
        //        }

        //        return new StatusCodeResult(200);
        //    }

        //    return new StatusCodeResult(400);
        //}

        public async Task<bool> CheckStatusOfAccAsync(string username)
        {
            var user = await GetFrozenAccAsync(username);

            if (user == null)
            {
                return false;
            }

            //if (DateTime.Now.Subtract((DateTime)user.DateOfFreezing).Days > user.FreezingDeadline)
            //{
            //    return true;
            //}

            return true;
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
                throw new Exception(ex.Message, ex);
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
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task DeleteAccAsync(int userId, DeletedAccount deletedAccount)
        {
            try
            {
                var user = await GetAccByIdAsync(userId);
                var stats = await GetQuizStatsByIdAsync(userId);

                if (user != null)
                {
                    _context.Users.Remove(user!);

                    _context.Quizzes.RemoveRange(stats!);

                    await _context.DeletedAccounts.AddAsync(deletedAccount);

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex) when (ex is DbUpdateConcurrencyException or DbUpdateException or OperationCanceledException)
            {
                throw new Exception(ex.Message, ex);
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
            catch (Exception ex) when(ex is ArgumentException or ArgumentNullException or OperationCanceledException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        private async Task<IEnumerable<QuizStat?>> GetQuizStatsByIdAsync(int? userId)
        {
            if (userId == null)
            {
                return null;
            }

            try
            {
                return await _context.Quizzes.Where(x => x.UserId == userId).ToListAsync();
            }
            catch (Exception ex) when (ex is ArgumentException or ArgumentNullException or OperationCanceledException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        private async Task<User?> GetFrozenAccAsync(string username)
        {
            try
            {
                return await _context.Users.SingleOrDefaultAsync(x => x.Username == username && x.IsFrozen == true);
            }
            catch (Exception ex) when (ex is ArgumentException or ArgumentNullException or OperationCanceledException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        private static string RandomPasswordGenerator(int length)
        {
            try
            {
                byte[] result = new byte[length];

                for (int index = 0; index < length; index++)
                {
                    result[index] = (byte)new Random().Next(33, 126);
                }

                return System.Text.Encoding.ASCII.GetString(result);
            }
            catch (Exception ex) when (ex is ArgumentException or ArgumentNullException or ArgumentOutOfRangeException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        private static int RandomPasswordLength()
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
                        user.Password = newPassword;

                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        return new StatusCodeResult(400);
                    }
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

        public async Task<HttpResponseMessage> ChangePasswordAsync(string login, string oldPassword, string newPassword)
        {
            try
            {
                var password = await _context.Users.Where(x => x.Username == login).FirstOrDefaultAsync();

                if (password != null && BC.EnhancedVerify(oldPassword, password.Password, HashType.SHA512))
                {
                    password.Password = newPassword;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException)
            {
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
        }

        public async Task<HttpResponseMessage> ChangeBirthdayAsync(string login, DateTime oldBirthday, DateTime newBirthday)
        {
            try
            {
                var birthday = await _context.Users.Where(x => x.Username == login && x.Birthday == oldBirthday).FirstOrDefaultAsync();

                if (birthday != null)
                {
                    birthday.Birthday = newBirthday;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException)
            {
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
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
                throw new ArgumentOutOfRangeException(ex.Message, ex);
            }
        }
    }
}
