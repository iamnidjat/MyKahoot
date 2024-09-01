using KahootWebApi.Models;

namespace KahootWebApi.Services.Interfaces
{
    public interface IGamificationService
    {
        Task SubtractPointsAsync(int userId, int pointsToSubtract);
        Task<bool> UpgradeLevelAsync(int userId);
        Task<int[]> GetGamificationStatsAsync(int userId);
    }
}
