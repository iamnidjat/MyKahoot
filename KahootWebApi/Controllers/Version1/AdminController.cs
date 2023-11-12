using KahootWebApi.Services;
using Microsoft.AspNetCore.Http;
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
        public async Task<string[]> SendCredentials(string email)
        {
            return await _manager.SendCredentialsAsync(email);
        }
    }
}
