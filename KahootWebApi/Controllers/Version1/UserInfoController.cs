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

        [HttpGet("IsUsernameChanged")]
        public bool IsUsernameChanged(int id)
        {
            return _manager.IsUsernameChanged(id);
        }

        [HttpGet("IsEmailChanged")]
        public bool IsEmailChanged(int id)
        {
            return _manager.IsEmailChanged(id);
        }

        [HttpGet("IsEmailConfirmed")]
        public bool IsEmailConfirmed(int id)
        {
            return _manager.IsEmailConfirmed(id);
        }
    }
}
