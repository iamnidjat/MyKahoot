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

        [HttpGet("GetBadgesList")]
        public async Task<IEnumerable<UserBadge>> GetBadgesListAsync()
        {
            return await _gamificationService.GetBadgesListAsync();
        }

        [HttpGet("GetGamificationStats")]
        public async Task<int[]> GetGamificationStatsAsync(int userId)
        {
            return await _gamificationService.GetGamificationStatsAsync(userId);
        }

        [HttpPost("UpgradeLevel")]
        public async Task<bool> UpgradeLevelAsync(int userId)
        {
            return await _gamificationService.UpgradeLevelAsync(userId);       
        }

        [HttpPost("SubtractPoints")]
        public async Task SubtractPointsAsync(int userId, int points)
        {
            await _gamificationService.SubtractPointsAsync(userId, points);
        }
    }
}

