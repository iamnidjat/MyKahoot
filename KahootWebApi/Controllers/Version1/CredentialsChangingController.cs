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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<HttpResponseMessage> SetNameAsync(string username, string name)
        {
            return await _manager.SetNameAsync(username, name);
        }

        [HttpPost("SetSurname")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<HttpResponseMessage> SetSurnameAsync(string username, string surname)
        {
            return await _manager.SetSurnameAsync(username, surname);
        }

        [HttpPost("SetUsername")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<HttpResponseMessage> SetUsernameAsync(string oldUsername, string newUsername)
        {
            return await _manager.SetUsernameAsync(oldUsername, newUsername);
        }

        [HttpPost("SetMail")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<HttpResponseMessage> SetMailAsync(string username, string mail)
        {
            return await _manager.SetMailAsync(username, mail);
        }

        [HttpPost("SetBMail")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<HttpResponseMessage> SetBMailAsync(string username, string bMail)
        {
            return await _manager.SetBackUpMailAsync(username, bMail);
        }

        [HttpPost("ChangeUsernameChangingToTrue")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<HttpResponseMessage> ChangeUsernameChangingToTrueAsync(int id)
        {
            return await _manager.ChangeUsernameChangingToTrueAsync(id);
        }

        [HttpPost("ChangeEmailChangingToTrue")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<HttpResponseMessage> ChangeEmailChangingToTrueAsync(int id)
        {
            return await _manager.ChangeEmailChangingToTrueAsync(id);
        }

        [HttpPost("ChangeEmailConfirmationChangingToTrue")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<HttpResponseMessage> ChangeEmailConfirmationChangingToTrueAsync(int id)
        {
            return await _manager.ChangeEmailConfirmationChangingToTrueAsync(id);
        }
    }
}
