using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MimeKit;

namespace KahootWebApi.Services.Implementations
{
    public class NewsLetter : INewsLetter
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<NewsLetter> _logger;

        public NewsLetter(KahootDbContext context, ILogger<NewsLetter> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IActionResult> SendingNewsAsync(string news)
        {
            using var smtpClient = new MailKit.Net.Smtp.SmtpClient();

            IEnumerable<string> emails = GetAllEmails();

            foreach (var email in emails)
            {
                if (Validators.IsEmailValid(email))
                {
                    try
                    {
                        smtpClient.Connect("smtp.gmail.com", 465, MailKit.Security.SecureSocketOptions.Auto);
                        smtpClient.Authenticate(ApplicationDatas.FirstMail, ApplicationDatas.Password);

                        var message = new MimeMessage();

                        message.From.Add(new MailboxAddress("MyKahoot", ApplicationDatas.FirstMail));
                        message.To.Add(new MailboxAddress("You", email));

                        message.Subject = "News";

                        var part = new TextPart("plain")
                        {
                            Text = news
                        };

                        message.Body = part;

                        smtpClient.Send(message);
                    }
                    catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
                    {
                        _logger.LogError(ex, "An error occurred in the SendingNewsAsync method.");
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

            _logger.LogError("Mails are not valid."); //
            return new StatusCodeResult(400);
        }

        private IEnumerable<string> GetAllEmails()
        {
            try
            {
                return _context.Users.Select(m => m.Email);
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException or InvalidOperationException)
            {
                _logger.LogError(ex, "An error occurred in the GetAllEmails method.");
                return Enumerable.Empty<string>();
            }
        }
    }
}

