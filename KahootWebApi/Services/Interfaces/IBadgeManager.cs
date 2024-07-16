using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;

namespace KahootWebApi.Services.Interfaces
{
    public interface IBadgeManager
    {
        Task AssignBadgeAsync(int userId, int badgeId);
        Task CheckAndAwardQuizCompletionBadgesAsync(int userId);
        Task CheckAndAwardQuizCreationBadgesAsync(int userId);
        Task CheckAndAwardLeaderBoardBadgesAsync(int userId);
        Task<IEnumerable<Badge>> GetBadgesListAsync();
        Task<IEnumerable<BadgeDto>> GetUserBadgesAsync(int userId);
    }
}
