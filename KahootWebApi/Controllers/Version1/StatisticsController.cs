﻿using KahootWebApi.Models;
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task UploadResult(QuizStat model)
        {
            await _manager.UploadResultAsync(model);
        }

        [HttpGet("DownloadResult/{userId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<QuizStat>> DownloadResult(int userId, string catType, string quizType, string level)
        {
            return await _manager.DownloadResultAsync(userId, catType, quizType, level);
        }
        
        [HttpGet("DownloadResults")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<QuizStat>> DownloadResult(string catType, string quizType, string level)
        {
            return await _manager.DownloadResultAsync(catType, quizType, level);
        }

        [HttpGet("DownloadTopResult")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<QuizStat>> DownloadTopResultAsync(int userId)
        {
            return await _manager.DownloadTopResultAsync(userId);
        }

        [HttpGet("GetLeaderBoardUsers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<User>> GetLeaderBoardUsersAsync()
        {
            return await _manager.GetLeaderBoardUsersAsync();
        }
    }
}
