using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace KahootWebApi.Services
{
    public class MailConfirmationManager : IMailConfirmationManager
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<MailConfirmationManager> _logger;

        public MailConfirmationManager(KahootDbContext context, ILogger<MailConfirmationManager> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IActionResult> EmailConfirmationAsync(string email, int userId)
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

                    message.Subject = "Confirm your account";

                    var part = new TextPart("html")
                    {
                        Text = $"Please confirm your account by clicking this link: <a href=\"http://localhost:4200/app/email-confirmed-form/{userId}\">link</a>.\nIf the message was sent by mistake, just ignore it."
                    };

                    message.Body = part;

                    smtpClient.Send(message);
                }
                catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
                {
                    _logger.LogError(ex, "An error occurred in the EmailConfirmationAsync method.");
                    return new StatusCodeResult(400);
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
    }
}
