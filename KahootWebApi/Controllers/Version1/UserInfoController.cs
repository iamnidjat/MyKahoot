using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
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
        public async Task<User> GetUserInfoAsync([FromQuery] int id)
        {
            return await _manager.GetUserInfoAsync(id);
        }

        [HttpGet("GetUserInfoByUsername")]
        public async Task<User> GetUserInfoByUsernameAsync([FromQuery] string username)
        {
            return await _manager.GetUserInfoByUsernameAsync(username);
        }

        [HttpGet("DoesUserExist")]
        public async Task<bool> DoesUserExistAsync([FromQuery] string username)
        {
            return await _manager.DoesUserExistAsync(username);
        }

        [HttpGet("IsEmailUsed")]
        public async Task<bool> IsEmailUsedAsync([FromQuery] string mail)
        {
            return await _manager.IsEmailUsedAsync(mail);
        }

        [HttpGet("IsUsernameChanged")]
        public async Task<bool> IsUsernameChangedAsync([FromQuery] int id)
        {
            return await _manager.IsUsernameChangedAsync(id);
        }

        [HttpGet("IsEmailChanged")]
        public async Task<bool> IsEmailChangedAsync([FromQuery] int id)
        {
            return await _manager.IsEmailChangedAsync(id);
        }

        [HttpGet("IsEmailConfirmed")]
        public async Task<bool> IsEmailConfirmedAsync([FromQuery] string mail)
        {
            return await _manager.IsEmailConfirmedAsync(mail);
        }
    }
}
