using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using KahootWebApi.Models;
using KahootWebApi.ViewModels;
using Microsoft.EntityFrameworkCore;

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

            try
            {
                MailAddress from = new ("gurbanli.nidjat@mail.ru", "MYKAHOOT");
                MailAddress to = new (email);
                MailMessage m = new (from, to);
                m.Subject = "Reset Password";
                m.Body = $"Your new password: {newPassword}";
                SmtpClient smtp = new ("smtp.gmail.com", 587);
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("gurbanli.nidjat@mail.ru", "liverton2"); // !!!
                smtp.EnableSsl = true;

                await smtp.SendMailAsync(m);

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
            catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException)
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

        public async Task<HttpResponseMessage> ChangePasswordAsync(string oldPassword, string newPassword)
        {
            var birthday = await _context.Users.Where(x => x.Password == oldPassword).FirstOrDefaultAsync();

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

        public async Task<HttpResponseMessage> ChangeBirthdayAsync(DateTime oldBirthday, DateTime newBirthday)
        {
            var birthday = await _context.Users.Where(x => x.Birthday == oldBirthday).FirstOrDefaultAsync();

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
    }
}
