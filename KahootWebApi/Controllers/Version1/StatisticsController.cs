using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

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
        public async Task UploadResultAsync([FromBody] QuizStat model, [FromQuery] int quizId, [FromQuery] string quizCreator)
        {
            await _manager.UploadResultAsync(model, quizId, quizCreator);
        }

        [HttpGet("DownloadResult/{userId:int}")]
        public async Task<IEnumerable<QuizStat>> DownloadResultAsync(int userId, [FromQuery] string catType, [FromQuery] string quizType, [FromQuery] string level)
        {
            return await _manager.DownloadResultAsync(userId, catType, quizType, level);
        }
        
        [HttpGet("DownloadResults")]
        public async Task<IEnumerable<QuizStat>> DownloadResultAsync([FromQuery] string catType, [FromQuery] string quizType, [FromQuery] string level)
        {
            return await _manager.DownloadResultAsync(catType, quizType, level);
        }

        [HttpGet("DownloadTopResult")]
        public async Task<IEnumerable<QuizStat>> DownloadTopResultAsync([FromQuery] int userId)
        {
            return await _manager.DownloadTopResultAsync(userId);
        }

        [HttpGet("GetLeaderBoardUsers")]
        public async Task<IEnumerable<User>> GetLeaderBoardUsersAsync()
        {
            return await _manager.GetLeaderBoardUsersAsync();
        }
    }
}
