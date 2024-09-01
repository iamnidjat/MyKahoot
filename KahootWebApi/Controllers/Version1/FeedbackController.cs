using KahootWebApi.Services.Interfaces;
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

        [HttpPost("SendFeedback")] // !
        public async Task<IActionResult> SendFeedbackAsync([FromQuery] string firstName, [FromQuery] string lastName, [FromQuery] string email, [FromQuery] string phoneNumber, [FromQuery] string message)
        {
            return await _manager.SendFeedbackAsync(firstName, lastName, email, phoneNumber, message);
        }
    }
}
