using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/NewsLetter/")]
    [ApiController]
    public class NewsLetterController : ControllerBase
    {
        private readonly INewsLetter _manager;

        public NewsLetterController(INewsLetter manager)
        {
            _manager = manager;
        }

        [HttpPost("SendingNews")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendingNews(string news)
        {
            return await _manager.SendingNewsAsync(news);
        }
    }
}
