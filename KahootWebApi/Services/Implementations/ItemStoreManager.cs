using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace KahootWebApi.Services.Implementations
{
    public partial class ItemStoreManager : IItemStoreManager
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<ItemStoreManager> _logger;
        private readonly IWebHostEnvironment _environment;

        public ItemStoreManager(KahootDbContext context, ILogger<ItemStoreManager> logger, IWebHostEnvironment environment)
        {
            _context = context;
            _logger = logger;
            _environment = environment;
        }

        public async Task<IEnumerable<ItemToBuy>> GetAllItemsAsync()
        {
            try
            {
                return await _context.ItemToBuys.ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetAllItemsAsync method.");
                return Enumerable.Empty<ItemToBuy>();
            }
        }

        public async Task<IEnumerable<ItemToBuyWithQuantityDto>> GetUserItemsAsync(int userId)
        {
            try
            {
                return await _context.UserItems
                               .Where(ui => ui.UserId == userId)
                               .Select(ui => new ItemToBuyWithQuantityDto
                               {
                                   ItemToBuyId = ui.ItemToBuy.Id,
                                   Name = ui.ItemToBuy.Name,
                                   Description = ui.ItemToBuy.Description,
                                   Price = ui.ItemToBuy.Price,
                                   Photo = ui.ItemToBuy.Photo,
                                   Quantity = ui.Quantity,
                                   Address = ui.Address,
                                   Country = ui.Country,
                                   City = ui.City,
                               })
                               .ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetUserItemsAsync method.");
                return Enumerable.Empty<ItemToBuyWithQuantityDto>();
            }
        }

        public async Task<ResultModel> BuyAnItemAsync(int itemId, int userId, int quantity, string address, string city, string country)
        {
            try
            {
                var item = await _context.ItemToBuys.FirstOrDefaultAsync(i => i.Id == itemId);
                var user = await _context.Users.FirstOrDefaultAsync(i => i.Id == userId);

                if (item != null)
                {
                    if (user.Coins > (item.Price * quantity))
                    {
                        await _context.UserItems.AddAsync(new Models.UserItem
                        {
                            UserId = userId,
                            ItemToBuyId = itemId,
                            PurchasedTime = DateTime.Now,
                            Quantity = quantity,
                            Address = address,
                            City = city,
                            Country = country,
                        });

                        item.Quantity -= quantity;
                        user.Coins -= (item.Price * quantity);
                        await _context.SaveChangesAsync();
                        await SendInfoAboutPurchaseAsync(user.Email, user.Username, item.Name, address, city, country);

                        return new ResultModel { Success = true };
                    }

                    _logger.LogWarning($"User {userId} attempted to buy item {itemId} while not having sufficient coins.");
                    return new ResultModel { Success = false, Reason = "insufficient_coins" }; 
                }

                return new ResultModel { Success = false, Reason = "not_found" };
            }
            catch (Exception ex) when (ex is DbUpdateException or DbUpdateConcurrencyException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the BuyAnItemAsync method.");
                return new ResultModel { Success = false, Reason = "server_error" };
            }
        }

        public async Task<ResultModel> ReturnPurchaseAsync(int itemId, int userId)
        {
            try
            {
                var item = await _context.ItemToBuys.FirstOrDefaultAsync(i => i.Id == itemId);
                var user = await _context.Users.FirstOrDefaultAsync(i => i.Id == userId);
                var userItem = await _context.UserItems.FirstOrDefaultAsync(i => i.UserId == userId && i.ItemToBuyId == itemId);

                if (userItem != null)
                {
                    // Check if the purchase was made within the last 3 days
                    if (userItem.PurchasedTime.AddDays(3) >= DateTime.UtcNow)
                    {
                        userItem.Quantity -= 1;
                        if (userItem.Quantity == 0)
                        {
                            _context.UserItems.Remove(userItem);
                        }

                        item.Quantity += 1;
                        user.Coins += item.Price;
                        await _context.SaveChangesAsync();
                        await SendInfoAboutPurchaseAsync(user.Email, user.Username, item.Name);

                        return new ResultModel { Success = true };
                    }
                    
                    _logger.LogWarning($"User {userId} attempted to return item {itemId} after the allowed return period.");
                    return new ResultModel { Success = false, Reason = "time_expired" };
                }

                return new ResultModel { Success = false, Reason = "not_found" };
            }
            catch (Exception ex) when (ex is DbUpdateException or DbUpdateConcurrencyException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the ReturnPurchaseAsync method.");
                return new ResultModel { Success = false, Reason = "server_error" };
            }
        }

        public async Task<ResultModel> EditItemAsync(int itemId, ItemToBuyDto itemDto)
        {
            var uploadPath = Path.Combine(_environment.ContentRootPath, "itemPhotos");

            // Ensure the upload directory exists
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            try
            {
                var item = await _context.ItemToBuys.FirstOrDefaultAsync(i => i.Id == itemId);

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

                if (item != null)
                {
                    item.Name = itemDto.Name;
                    item.Description = itemDto.Description;
                    item.Price = itemDto.Price;
                    item.Quantity = itemDto.Quantity;

                    await _context.SaveChangesAsync();

                    return new ResultModel { Success = true };
                }

                return new ResultModel { Success = false, Reason = "not_found" };
            }
            catch (Exception ex) when (ex is DbUpdateException or DbUpdateConcurrencyException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the EditItemAsync method.");
                return new ResultModel { Success = false, Reason = "server_error" };
            }
        }

        private async Task<IActionResult> SendInfoAboutPurchaseAsync(string email, string userName, string itemName, string address = "", string city = "", string country = "")
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
                    ? $"Dear {userName}! You made a purchase, you bought the {itemName}. Your purchase will be delivered to the {address} address (country: ${country}, city: ${city}) in the coming days."
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

        public async Task DisableItemInStoreAsync(int itemId)
        {
            try
            {
                var item = await _context.ItemToBuys.FirstOrDefaultAsync(i => i.Id == itemId);

                if (item != null)
                {
                    item.IsDisabled = true;
                }

                await _context.SaveChangesAsync();
            }
            catch(Exception ex) when (ex is ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the DisableItemInStoreAsync method.");
            }
        }

        public async Task EnableItemInStoreAsync(int itemId)
        {
            try
            {
                var item = await _context.ItemToBuys.FirstOrDefaultAsync(i => i.Id == itemId);

                if (item != null)
                {
                    item.IsDisabled = false;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the EnableItemInStoreAsync method.");
            }
        }
    }
}
