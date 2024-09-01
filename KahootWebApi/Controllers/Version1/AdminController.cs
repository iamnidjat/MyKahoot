using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;
using KahootWebApi.Services.Implementations;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/Admin/")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminManager _manager;

        public AdminController(IAdminManager manager)
        {
            _manager = manager;
        }

        [HttpPost("SendCredentials")]
        public async Task<string> SendCredentialsAsync([FromQuery] string email)
        {
            return await _manager.SendCredentialsAsync(email);
        }

        [HttpGet("GetAllUsers")]
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _manager.GetAllUsersAsync();
        }

        [HttpGet("GetAllBannedUsers")]
        public async Task<IEnumerable<User>> GetAllBannedUsersAsync()
        {
            return await _manager.GetAllBannedUsersAsync();
        }

        [HttpGet("GetAllQuizzes")]
        public async Task<IEnumerable<CreatedQuiz>> GetAllQuizzesAsync()
        {
            return await _manager.GetAllQuizzesAsync();
        }

        [HttpPost("BanUser")]
        public async Task BanUserAsync([FromQuery] int userId)
        {
            await _manager.BanUserAsync(userId);
        }

        [HttpPost("UnbanUser")]
        public async Task<IActionResult> UnbanUserAsync([FromQuery] int userId)
        {
            var result = await _manager.UnbanUserAsync(userId);

            if (result.Success)
            {
                return Ok(new { success = true });
            }
            else if (result.Reason == "not_expired")
            {
                return BadRequest(new { success = false, reason = "not_expired" });
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

        [HttpGet("IsUserBanned")]
        public async Task<bool> IsUserBannedAsync([FromQuery] int userId)
        {
            return await _manager.IsUserBannedAsync(userId);
        }

        [HttpDelete("DeleteQuiz")]
        public async Task DeleteQuizAsync([FromQuery] int quizId)
        {
            await _manager.DeleteQuizAsync(quizId);
        }

        [HttpPost("SendMessageToEmail")]
        public async Task SendMessageToEmailaAsync([FromQuery] string email, [FromQuery] string title, [FromQuery] string body)
        {
            await _manager.SendMessageToEmailAsync(email, title, body);
        }

        [HttpPost("AddItemToStore")]
        public async Task AddItemToStoreAsync([FromForm] ItemToBuyDto item)
        {
            await _manager.AddItemToStoreAsync(item);
        }

        [HttpDelete("RemoveItemFromStore")]
        public async Task RemoveItemFromStoreAsync([FromQuery] int itemId)
        {
            await _manager.RemoveItemFromStoreAsync(itemId);
        }
    }
}
