using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/NewsLetter/")]
    [ApiController]
    public class NewsLetter : ControllerBase
    {
        private readonly INewsLetter _manager;

        public NewsLetter(INewsLetter manager)
        {
            _manager = manager;
        }

        [HttpPost("SendingNews")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendingNews(string news)
        {
            return await _manager.SendingNewsAsync(news);
        }
    }
}
