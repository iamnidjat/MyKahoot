namespace KahootWebApi.Services.Interfaces
{
    public interface IItemStoreManager
    {
        Task<bool> BuyAnItemAsync(int itemId, int userId, int quantity, string address);
        Task<bool> ReturnPurchaseAsync(int itemId, int userId, int quantity);
    }
}
