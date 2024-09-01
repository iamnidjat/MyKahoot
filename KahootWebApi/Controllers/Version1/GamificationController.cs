using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/Gamification/")]
    [ApiController]
    public class GamificationController : ControllerBase
    {
        private readonly IGamificationService _gamificationService;

        public GamificationController(IGamificationService gamificationService)
        {
            _gamificationService = gamificationService;
        }

        [HttpGet("GetGamificationStats")]
        public async Task<int[]> GetGamificationStatsAsync([FromQuery] int userId)
        {
            return await _gamificationService.GetGamificationStatsAsync(userId);
        }

        [HttpPost("UpgradeLevel")]
        public async Task<bool> UpgradeLevelAsync([FromQuery] int userId)
        {
            return await _gamificationService.UpgradeLevelAsync(userId);       
        }

        [HttpPost("SubtractPoints")]
        public async Task SubtractPointsAsync([FromQuery] int userId, [FromQuery] int points)
        {
            await _gamificationService.SubtractPointsAsync(userId, points);
        }
    }
}

