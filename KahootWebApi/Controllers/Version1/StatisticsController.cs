using KahootWebApi.Models;
using KahootWebApi.Services;
using KahootWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.v1
{
    [ApiController]
    [Route("api/v1/Statistics/")]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsManager _manager;

        public StatisticsController(IStatisticsManager manager)
        {
            _manager = manager;
        }

        [HttpPost("UploadResult")]
        public async Task<HttpResponseMessage> UploadResult(QuizStat model)
        {
            return await _manager.UploadResultAsync(model);
        }

        [HttpGet("DownloadResult")]
        public async Task<IEnumerable<QuizStat>> DownloadResult()
        {
            return await _manager.DownloadResultAsync();
        }
    }
}
