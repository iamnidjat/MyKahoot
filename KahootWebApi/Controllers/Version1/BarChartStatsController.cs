using KahootWebApi.Models;
using KahootWebApi.Services;
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<QuizStat>> DownloadResult(string catType, string quizType, string level)
        {
            return await _manager.DownloadResultAsync(catType, quizType, level);
        }
    }
}
