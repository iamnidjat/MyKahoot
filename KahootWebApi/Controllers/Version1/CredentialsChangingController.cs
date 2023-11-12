using KahootWebApi.Services;
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
        public Task<HttpResponseMessage> SetName(string username, string name)
        {
            return _manager.SetNameAsync(username, name);
        }

        [HttpPost("SetSurname")]
        public Task<HttpResponseMessage> SetSurname(string username, string surname)
        {
            return _manager.SetSurnameAsync(username, surname);
        }

        [HttpPost("SetUsername")]
        public Task<HttpResponseMessage> SetUsername(string oldUsername, string newUsername, DateTime DateOfChangingUsername)
        {
            return _manager.SetUsernameAsync(oldUsername, newUsername, DateOfChangingUsername);
        }

        [HttpPost("SetMail")]
        public Task<HttpResponseMessage> SetMail(string username, string mail)
        {
            return _manager.SetMailAsync(username, mail);
        }

        [HttpPost("SetBMail")]
        public Task<HttpResponseMessage> SetBMail(string username, string bMail)
        {
            return _manager.SetBackUpMailAsync(username, bMail);
        }

        [HttpPost("ChangeUsernameChangingToTrue")]
        public Task<HttpResponseMessage> ChangeUsernameChangingToTrue(int id)
        {
            return _manager.ChangeUsernameChangingToTrueAsync(id);
        }

        [HttpPost("ChangeEmailChangingToTrue")]
        public Task<HttpResponseMessage> ChangeEmailChangingToTrue(int id)
        {
            return _manager.ChangeEmailChangingToTrueAsync(id);
        }

        [HttpPost("ChangeEmailConfirmationChangingToTrue")]
        public Task<HttpResponseMessage> ChangeEmailConfirmationChangingToTrue(int id)
        {
            return _manager.ChangeEmailConfirmationChangingToTrueAsync(id);
        }
    }
}
