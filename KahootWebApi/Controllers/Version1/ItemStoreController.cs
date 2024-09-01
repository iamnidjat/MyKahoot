using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;
using KahootWebApi.Services.Interfaces;
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

        [HttpGet("GetAllItems")]
        public async Task<IEnumerable<ItemToBuy>> GetAllItemsAsync()
        {
            return await _itemStoreManager.GetAllItemsAsync();           
        }

        [HttpGet("GetUserItems")]
        public async Task<IEnumerable<ItemToBuyWithQuantityDto>> GetUserItemsAsync([FromQuery] int userId)
        {
            return await _itemStoreManager.GetUserItemsAsync(userId);
        }

        [HttpPost("BuyItem")]
        public async Task<IActionResult> BuyAnItemAsync([FromQuery] int itemId, [FromQuery] int userId, [FromQuery] int quantity, [FromQuery] string address, [FromQuery] string city, [FromQuery] string country)
        {
            var result =  await _itemStoreManager.BuyAnItemAsync(itemId, userId, quantity, address, city, country);
           
            if (result.Success)
            {
                return Ok(new { success = true });
            }
            else if (result.Reason == "insufficient_coins")
            {
                return BadRequest(new { success = false, reason = "insufficient_coins" });
            }
            else if (result.Reason == "not_found")
            {
                return NotFound(new { success = false, reason = "not_found" });
            }
            else
            {
                return StatusCode(500, new { success = false, reason = "server_error" });
            }
        }

        [HttpPost("ReturnPurchase")]
        public async Task<IActionResult> ReturnPurchaseAsync([FromQuery] int itemId, [FromQuery] int userId)
        {
            var result = await _itemStoreManager.ReturnPurchaseAsync(itemId, userId);

            if (result.Success)
            {
                return Ok(new { success = true });
            }
            else if (result.Reason == "time_expired")
            {
                return BadRequest(new { success = false, reason = "time_expired" });
            }
            else if (result.Reason == "not_found")
            {
                return NotFound(new { success = false, reason = "not_found" });
            }
            else
            {
                return StatusCode(500, new { success = false, reason = "server_error" });
            }
        }

        [HttpPut("EditItem")]
        [HttpPatch("EditItem")]
        public async Task<IActionResult> EditItemAsync([FromQuery] int itemId, [FromForm] ItemToBuyDto item)
        {
            var result = await _itemStoreManager.EditItemAsync(itemId, item);

            if (result.Success)
            {
                return Ok(new { success = true });
            }
            else if (result.Reason == "not_found")
            {
                return NotFound(new { success = false, reason = "not_found" });
            }
            else
            {
                return StatusCode(500, new { success = false, reason = "server_error" });
            }
        }

        [HttpPatch("DisableItemInStore")]
        public async Task DisableItemInStoreAsync([FromQuery] int itemId)
        {
            await _itemStoreManager.DisableItemInStoreAsync(itemId);
        }


        [HttpPatch("EnableItemInStore")]
        public async Task EnableItemInStoreAsync([FromQuery] int itemId)
        {
            await _itemStoreManager.EnableItemInStoreAsync(itemId);
        }
    }
}
