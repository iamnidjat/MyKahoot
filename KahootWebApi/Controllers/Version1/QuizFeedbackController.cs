using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/QuizFeedback/")]
    [ApiController]
    public class QuizFeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public QuizFeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpPost("SendQuizFeedback")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task SendQuizFeedbackAsync([FromBody] Feedback feedback)
        {
             await _feedbackService.SendQuizFeedbackAsync(feedback);
        }
    }
}
