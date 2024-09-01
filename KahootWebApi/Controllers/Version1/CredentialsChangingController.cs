using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/CredentialsChanging/")]
    [ApiController]
    public class CredentialsChangingController : ControllerBase
    {
        private readonly ICredentialsChangingManager _manager;

        public CredentialsChangingController(ICredentialsChangingManager manager)
        {
            _manager = manager;
        }

        [HttpPost("SetName")]
        public async Task<HttpResponseMessage> SetNameAsync([FromQuery] string username, [FromQuery] string name)
        {
            return await _manager.SetNameAsync(username, name);
        }

        [HttpPost("SetSurname")]
        public async Task<HttpResponseMessage> SetSurnameAsync([FromQuery] string username, [FromQuery] string surname)
        {
            return await _manager.SetSurnameAsync(username, surname);
        }

        [HttpPost("SetUsername")]
        public async Task<HttpResponseMessage> SetUsernameAsync([FromQuery] string oldUsername, [FromQuery] string newUsername)
        {
            return await _manager.SetUsernameAsync(oldUsername, newUsername);
        }

        [HttpPost("SetMail")]
        public async Task<HttpResponseMessage> SetMailAsync([FromQuery] string username, [FromQuery] string mail)
        {
            return await _manager.SetMailAsync(username, mail);
        }

        [HttpPost("SetBMail")]
        public async Task<HttpResponseMessage> SetBMailAsync([FromQuery] string username, [FromQuery] string bMail)
        {
            return await _manager.SetBackUpMailAsync(username, bMail);
        }

        [HttpPost("ChangeUsernameChangingToTrue")]
        public async Task<HttpResponseMessage> ChangeUsernameChangingToTrueAsync([FromQuery] int id)
        {
            return await _manager.ChangeUsernameChangingToTrueAsync(id);
        }

        [HttpPost("ChangeEmailChangingToTrue")]
        public async Task<HttpResponseMessage> ChangeEmailChangingToTrueAsync([FromQuery] int id)
        {
            return await _manager.ChangeEmailChangingToTrueAsync(id);
        }

        [HttpPost("ChangeEmailConfirmationChangingToTrue")]
        public async Task<HttpResponseMessage> ChangeEmailConfirmationChangingToTrueAsync([FromQuery] int id)
        {
            return await _manager.ChangeEmailConfirmationChangingToTrueAsync(id);
        }
    }
}
