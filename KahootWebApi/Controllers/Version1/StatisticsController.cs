using KahootWebApi.Models;
using KahootWebApi.Services;
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

        //[HttpPost("UploadResult")]
        //public QuizStat UploadResult(QuizStat model)
        //{
        //    return _manager.UploadResultAsync(model);
        //}

        // Do not touch it !!!
        //[HttpPost("UploadResult")]
        //public async Task<QuizStat> UploadResult(QuizStat model)
        //{
        //    return await _manager.UploadResultAsync(model);
        //}

        [HttpPost("UploadResult")]
        public async Task UploadResult(QuizStat model)
        {
            await _manager.UploadResultAsync(model);
        }

        [HttpGet("DownloadResult/{userId:int}")]
        public async Task<IEnumerable<QuizStat>> DownloadResult(int userId)
        {
            return await _manager.DownloadResultAsync(userId);
        }

        [HttpGet("DownloadResult")]
        public async Task<IEnumerable<QuizStat>> DownloadResult(string quizType)
        {
            return await _manager.DownloadResultAsync(quizType);
        }
    }
}
