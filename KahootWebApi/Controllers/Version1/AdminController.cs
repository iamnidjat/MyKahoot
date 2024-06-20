using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<string[]> SendCredentialsAsync(string email)
        {
            return await _manager.SendCredentialsAsync(email);
        }

        [HttpGet("GetAllUsers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _manager.GetAllUsersAsync();
        }

        [HttpGet("GetAllQuizzes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<CreatedQuiz>> GetAllQuizzesAsync()
        {
            return await _manager.GetAllQuizzesAsync();
        }

        [HttpDelete("DeleteUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task DeleteUserAsync(int userId)
        {
            await _manager.DeleteUserAsync(userId);
        }

        [HttpPost("BanUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task BanUserAsync(int userId)
        {
            await _manager.BanUserAsync(userId);
        }

        [HttpPost("UnbanUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task UnbanUserAsync(int userId)
        {
            await _manager.UnbanUserAsync(userId);
        }

        [HttpGet("IsUserBanned")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> IsUserBannedAsync(int userId)
        {
            return await _manager.IsUserBannedAsync(userId);
        }

        [HttpDelete("DeleteQuiz")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task DeleteQuizAsync(int quizId)
        {
            await _manager.DeleteQuizAsync(quizId);
        }      
    }
}
