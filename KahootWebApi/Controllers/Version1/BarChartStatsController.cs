using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/BarChartStats/")]
    [ApiController]
    public class BarChartStatsController : ControllerBase
    {
        private readonly IBarChartStatsManager _manager;

        public BarChartStatsController(IBarChartStatsManager manager)
        {
            _manager = manager;
        }

        [HttpGet("DownloadResult")]
        public async Task<IEnumerable<QuizStat>> DownloadResultAsync([FromQuery] string catType, [FromQuery] string quizType, [FromQuery] string level)
        {
            return await _manager.DownloadResultAsync(catType, quizType, level);
        }
    }
}
