using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;

namespace KahootWebApi.Services.Interfaces
{
    public interface IItemStoreManager
    {
        Task<IEnumerable<ItemToBuy>> GetAllItemsAsync();
        Task<IEnumerable<ItemToBuyWithQuantityDto>> GetUserItemsAsync(int userId);
        Task<ResultModel> BuyAnItemAsync(int itemId, int userId, int quantity, string address, string city, string country);
        Task<ResultModel> ReturnPurchaseAsync(int itemId, int userId);
        Task<ResultModel> EditItemAsync(int itemId, ItemToBuyDto itemDto);
        Task DisableItemInStoreAsync(int itemId);
        Task EnableItemInStoreAsync(int itemId);
    }
}
