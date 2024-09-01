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
        public async Task<IActionResult> SendingNewsAsync([FromQuery] string news)
        {
            return await _manager.SendingNewsAsync(news);
        }
    }
}
