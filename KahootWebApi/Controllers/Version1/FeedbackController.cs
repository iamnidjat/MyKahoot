using KahootWebApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/Feedback/")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IContactManager _manager;

        public FeedbackController(IContactManager manager)
        {
            _manager = manager;
        }

        [HttpPost("SendFeedback")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendFeedback(string firstName, string lastName, string email, string phoneNumber, string message)
        {
            return await _manager.SendFeedbackAsync(firstName, lastName, email, phoneNumber, message);
        }
    }
}
