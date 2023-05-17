using System.Net;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using KahootWebApi.Models;
using KahootWebApi.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using MimeKit;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace KahootWebApi.Services
{
    public class AccountManager : IAccountManager
    {
        private readonly KahootDbContext _context;

        public AccountManager(KahootDbContext context) 
        {
            _context = context;
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
            catch (Exception ex) when (ex is ArgumentException or ArgumentNullException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        private static int RandomPasswordLength()
        {
            var number = new Random().Next(5, 10);

            return number;
        }

        public static bool IsValid(string email)
        {
            string regex = @"^[^@\s]+@[^@\s]+\.(com|net|org|gov|ru)$";

            return Regex.IsMatch(email, regex, RegexOptions.IgnoreCase);
        }

        public async Task<HttpResponseMessage> ResetPasswordAsync(string email)
        {
            var newPassword = RandomPasswordGenerator(RandomPasswordLength());

            using var smtpClient = new MailKit.Net.Smtp.SmtpClient();

            if (IsValid(email))
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
                        return new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.BadRequest
                        };
                    }
                }
                catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                }
                finally
                {
                    smtpClient.Disconnect(true);
                }

                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
            }

            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        public async Task<HttpResponseMessage> ChangePasswordAsync(string login, string oldPassword, string newPassword)
        {
            try
            {
                var password = await _context.Users.Where(x => x.Username == login && x.Password == oldPassword).FirstOrDefaultAsync();

                if (password != null)
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
    }
}
