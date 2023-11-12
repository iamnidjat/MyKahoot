using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace KahootWebApi.Services
{
    public class AdminManager : IAdminManager
    {
        private readonly KahootDbContext _context;
        private readonly IAccountManager _manager;

        public AdminManager(KahootDbContext context, IAccountManager manager)
        {
            _context = context;
            _manager = manager;
        }

        public async Task<string[]> SendCredentialsAsync(string email)
        {
            var newPassword = RandomPasswordGenerator(RandomPasswordLength());
            var newLogin = _manager.RandomLoginGenerator();
            string[] credentials = new string[2] { newPassword, newLogin};

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
                        Text = $"Your new password: {newPassword}\nYour new login: {newLogin}\nIf the message was sent by mistake, just ignore it."
                    };

                    message.Body = part;

                    smtpClient.Send(message);
                }
                catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
                {
                    return credentials;
                }
                finally
                {
                    smtpClient.Disconnect(true);
                }

                return credentials;
            }

            return credentials;
        }

        private static int RandomPasswordLength()
        {
            var number = new Random().Next(5, 10);

            return number;
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
    }
}
