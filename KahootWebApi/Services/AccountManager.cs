using System.Net;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using KahootWebApi.Models;
using KahootWebApi.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using MimeKit;

namespace KahootWebApi.Services
{
    public class AccountManager : IAccountManager
    {
        private readonly KahootDbContext _context;

        public AccountManager(KahootDbContext context) 
        {
            _context = context;
        }

       
        public static string RandomPasswordGenerator(int length)
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
            catch (Exception ex) when (ex is ArgumentException or ArgumentNullException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public static int RandomPasswordLength()
        {
            var number = new Random().Next(5, 10);

            return number;
        }

        public async Task<HttpResponseMessage> ResetPasswordAsync(string email)
        {
            var newPassword = RandomPasswordGenerator(RandomPasswordLength());

            using var smtpClient = new MailKit.Net.Smtp.SmtpClient();

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
                    return new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest
                    };
                }
            }
            catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
            {
                return new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest
                };
            }
            finally
            {
                smtpClient.Disconnect(true);
            }

            return new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK
            };
        }

        public async Task<HttpResponseMessage> ChangePasswordAsync(int userId, string oldPassword, string newPassword)
        {
            try
            {
                var birthday = await _context.Users.Where(x => x.Id == userId && x.Password == oldPassword).FirstOrDefaultAsync();

                if (birthday != null)
                {
                    birthday.Password = newPassword;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException)
            {
                return new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest
                };
            }
        }

        public async Task<HttpResponseMessage> ChangeBirthdayAsync(int userId, DateTime oldBirthday, DateTime newBirthday)
        {
            try
            {
                var birthday = await _context.Users.Where(x => x.Id == userId && x.Birthday == oldBirthday).FirstOrDefaultAsync();

                if (birthday != null)
                {
                    birthday.Birthday = newBirthday;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException)
            {
                return new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest
                };
            }
        }
    }
}
