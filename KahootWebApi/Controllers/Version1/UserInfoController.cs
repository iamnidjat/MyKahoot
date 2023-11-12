using KahootWebApi.Models;
using KahootWebApi.Services;
using Microsoft.AspNetCore.Http;
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
        public async Task<User> GetUserInfo(int id)
        {
            return await _manager.GetUserInfoAsync(id);
        }

        [HttpGet("GetUserInfoByUsernameAsync")]
        public async Task<User> GetUserInfoByUsernameAsync(string username)
        {
            return await _manager.GetUserInfoByUsernameAsync(username);
        }

        [HttpGet("DoesUserExist")]
        public async Task<bool> DoesUserExist(string username)
        {
            return await _manager.DoesUserExist(username);
        }

        [HttpGet("GetNextDeadlineForChangingName")]
        public async Task<int> GetNextDeadlineForChangingName(int id)
        {
            return await _manager.GetNextDeadlineForChangingName(id);
        }

        [HttpGet("IsUsernameChanged")]
        public async Task<bool> IsUsernameChanged(int id)
        {
            return await _manager.IsUsernameChanged(id);
        }

        [HttpGet("IsEmailChanged")]
        public async Task<bool> IsEmailChanged(int id)
        {
            return await _manager.IsEmailChanged(id);
        }

        [HttpGet("IsEmailConfirmed")]
        public async Task<bool> IsEmailConfirmed(string mail)
        {
            return await _manager.IsEmailConfirmed(mail);
        }
    }
}
