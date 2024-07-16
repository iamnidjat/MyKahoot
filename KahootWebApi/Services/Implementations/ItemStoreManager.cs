using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace KahootWebApi.Services.Implementations
{
    public class ItemStoreManager : IItemStoreManager
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<ItemStoreManager> _logger;

        public ItemStoreManager(KahootDbContext context, ILogger<ItemStoreManager> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> BuyAnItemAsync(int itemId, int userId, int quantity, string address)
        {
            try
            {
                var item = await _context.ItemToBuys.FirstOrDefaultAsync(i => i.Id == itemId);
                var user = await _context.Users.FirstOrDefaultAsync(i => i.Id == userId);

                if (item != null && user.Coins > item.Price)
                {
                    await _context.UserItems.AddAsync(new Models.UserItem
                    {
                        UserId = userId,
                        ItemToBuyId = itemId,
                        PurchasedTime = DateTime.UtcNow,
                    });

                    item.Quantiy -= quantity;
                    user.Coins -= item.Price;
                    await _context.SaveChangesAsync();
                    await SendInfoAboutPurchaseAsync(user.Email, user.Username, item.Name, address);

                    return true;
                }

                return false;
            }
            catch (Exception ex) when (ex is DbUpdateException or DbUpdateConcurrencyException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the BuyAnItemAsync method.");
                return false;
            }
        }

        public async Task<bool> ReturnPurchaseAsync(int itemId, int userId, int quantity)
        {
            try
            {
                var item = await _context.ItemToBuys.FirstOrDefaultAsync(i => i.Id == itemId);
                var user = await _context.Users.FirstOrDefaultAsync(i => i.Id == userId);
                var userItem = await _context.UserItems.FirstOrDefaultAsync(i => i.UserId == userId && i.ItemToBuyId == itemId);

                if (userItem != null)
                {
                    _context.UserItems.Remove(userItem);

                    item.Quantiy += quantity;
                    user.Coins += item.Price;
                    await _context.SaveChangesAsync();
                    await SendInfoAboutPurchaseAsync(user.Email, user.Username, item.Name);

                    return true;
                }

                return false;
            }
            catch (Exception ex) when (ex is DbUpdateException or DbUpdateConcurrencyException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the ReturnPurchaseAsync method.");
                return false;
            }
        }

        private async Task<IActionResult> SendInfoAboutPurchaseAsync(string email, string userName, string itemName, string address = "")
        {
            using var smtpClient = new MailKit.Net.Smtp.SmtpClient();

            if (Validators.IsEmailValid(email))
            {
                try
                {
                    smtpClient.Connect("smtp.gmail.com", 465, MailKit.Security.SecureSocketOptions.Auto);
                    smtpClient.Authenticate(ApplicationDatas.FirstMail, ApplicationDatas.Password);

                    var localMessage = new MimeMessage();

                    localMessage.From.Add(new MailboxAddress("MyKahoot", ApplicationDatas.FirstMail));
                    localMessage.To.Add(new MailboxAddress("Me", "gurbanli.nidjat001@gmail.com"));

                    localMessage.Subject = "You made a purchase";

                    var text = address != ""
                    ? $"Dear {userName}! You made a purchase, you bought the {itemName}. Your purchase will be delivered to the {address} address in the coming days."
                    : $"Dear {userName}! You canceled a purchase ({itemName} item).";

                    var part = new TextPart("plain") { Text = text };

                    localMessage.Body = part;
                    smtpClient.Send(localMessage);
                }
                catch (Exception ex) when (ex is InvalidOperationException or ArgumentNullException or InvalidCastException)
                {
                    _logger.LogError(ex, "An error occurred in the SendInfoAboutPurchaseAsync method.");
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
