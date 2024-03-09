using KahootWebApi.Models;
using KahootWebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/UserInfo/")]
    [ApiController]
    public class UserInfoController : ControllerBase
    {
        private readonly IUserInfoManager _manager;

        public UserInfoController(IUserInfoManager manager)
        {
            _manager = manager;
        }

        [HttpGet("GetUserInfo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<User> GetUserInfo([FromQuery] int id)
        // [FromQuery] explicitly specifies that the mail parameter is expected from the query string.
        {
            return await _manager.GetUserInfoAsync(id);
        }

        [HttpGet("GetUserInfoByUsernameAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<User> GetUserInfoByUsernameAsync([FromQuery] string username)
        {
            return await _manager.GetUserInfoByUsernameAsync(username);
        }

        [HttpGet("DoesUserExist")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> DoesUserExist([FromQuery] string username)
        {
            return await _manager.DoesUserExist(username);
        }

        [HttpGet("IsEmailUsed")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> IsEmailUsed([FromQuery] string mail)
        {
            return await _manager.IsEmailUsed(mail);
        }

        [HttpGet("GetNextDeadlineForChangingName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<int> GetNextDeadlineForChangingName([FromQuery] int id)
        {
            return await _manager.GetNextDeadlineForChangingName(id);
        }

        [HttpGet("IsUsernameChanged")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> IsUsernameChanged([FromQuery] int id)
        {
            return await _manager.IsUsernameChanged(id);
        }

        [HttpGet("IsEmailChanged")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> IsEmailChanged([FromQuery] int id)
        {
            return await _manager.IsEmailChanged(id);
        }

        [HttpGet("IsEmailConfirmed")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> IsEmailConfirmed([FromQuery] string mail)
        {
            return await _manager.IsEmailConfirmed(mail);
        }
    }
}
