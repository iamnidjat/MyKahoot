using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/ItemStore/")]
    [ApiController]
    public class ItemStoreController : ControllerBase
    {
        private readonly IItemStoreManager _itemStoreManager;

        public ItemStoreController(IItemStoreManager itemStoreManager) 
        {
            _itemStoreManager = itemStoreManager;
        }

        [HttpPost("BuyItem")]
        public async Task<bool> BuyAnItemAsync(int itemId, int userId, int quantity, string address)
        {
            return await _itemStoreManager.BuyAnItemAsync(itemId, userId, quantity, address);
        }

        [HttpPost("ReturnPurchase")]
        public async Task<bool> ReturnPurchaseAsync(int itemId, int userId, int quantity)
        {
            return await _itemStoreManager.ReturnPurchaseAsync(itemId, userId, quantity);
        }
    }
}
