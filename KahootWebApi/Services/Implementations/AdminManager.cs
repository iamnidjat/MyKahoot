﻿using KahootWebApi.Models;
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

        public AdminManager(KahootDbContext context, IAccountManager manager,
            ILogger<AdminManager> logger)
        {
            _context = context;
            _manager = manager;
            _logger = logger;
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

        public async Task DeleteUserAsync(int userId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

                if (user != null)
                {
                    _context.Users.Remove(user);
                }

                await _context.SaveChangesAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the DeleteUser method.");
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

                if (user != null)
                {
                    return user.IsBanned;
                }

                return false;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the BanUserAsync method.");
                return false;
            }
        }

        public async Task UnbanUserAsync(int userId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

                if (user != null)
                {
                    user.IsBanned = false; 
                }

                await _context.SaveChangesAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the UnbanUserAsync method.");
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

        public async Task AddItemToStoreAsync(ItemToBuy item)
        {
            try
            {
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
