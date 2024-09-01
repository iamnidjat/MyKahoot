using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services.Implementations
{
    public class GamificationService : IGamificationService
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<GamificationService> _logger;

        public GamificationService(KahootDbContext context, ILogger<GamificationService> logger)
        {
            _context = context;
            _logger = logger;
        }


        public async Task<int[]> GetGamificationStatsAsync(int userId)
        {
            try
            {
                var gamificationStats = new List<int>();
                User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

                if (user != null)
                {
                    gamificationStats.Add(user.Level);
                    gamificationStats.Add(user.Points);
                    gamificationStats.Add(user.OverallPoints);
                    gamificationStats.Add(user.Coins);

                    return gamificationStats.ToArray();
                }
                else
                {
                    _logger.LogWarning($"There is no user with the {userId} id!");
                }
                return new int[0];
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the GetGamificationStatsAsync method.");
                return new int[0];
            }
        }

        // this method for admin
        public async Task SubtractPointsAsync(int userId, int pointsToSubtract)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            try
            {
                if (user != null)
                {
                    user!.Points = (user.Points - pointsToSubtract) >= 0 ? user.Points - pointsToSubtract : 0;

                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogWarning($"There is no user with the {userId} id!");
                }
            }
            catch (Exception ex) when (ex is DbUpdateException or DbUpdateConcurrencyException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the SubtractPointsAsync method.");
            }
        }

        public async Task<bool> UpgradeLevelAsync(int userId)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            
            try
            {
                if (user != null)
                {
                    // Determine the required points for the next level based on the current level
                    int requiredPointsForNextLevel;
                    switch (user.Level)
                    {
                        case 1:
                            requiredPointsForNextLevel = 15;
                            break;
                        case 2:
                            requiredPointsForNextLevel = 30;
                            break;
                        case 3:
                            requiredPointsForNextLevel = 50;
                            break;
                        case 4:
                            requiredPointsForNextLevel = 100;
                            break;
                        default:
                            requiredPointsForNextLevel = 175;
                            break;
                    }

                    // Upgrade the user's level if they have enough points
                    if (user.Points >= requiredPointsForNextLevel)
                    {
                        user.Level++;
                        user.Points -= requiredPointsForNextLevel;
                        await _context.SaveChangesAsync();
                        return true;
                    }

                    return false;
                }
                else
                {
                    _logger.LogWarning($"There is no user with the {userId} id!");
                    return false;
                }
            }
            catch (Exception ex) when (ex is DbUpdateException or DbUpdateConcurrencyException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the UpgradeLevelAsync method.");
                return false;
            }
        }
    }
}
