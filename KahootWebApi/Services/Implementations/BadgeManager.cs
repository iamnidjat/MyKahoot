using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;
using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services.Implementations
{
    public class BadgeManager : IBadgeManager
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<BadgeManager> _logger;

        public BadgeManager(KahootDbContext context, ILogger<BadgeManager> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task AssignBadgeAsync(int userId, int badgeId)
        {            
            try
            {
                var userBadge = new UserBadge
                {
                    UserId = userId,
                    BadgeId = badgeId,
                    EarnedDate = DateTime.UtcNow
                };

                await _context.UserBadges.AddAsync(userBadge);
                await _context.SaveChangesAsync();
            }
            catch(OperationCanceledException ex)
            {
                _logger.LogError(ex, "An error occurred in the AssignBadgeAsync method.");
            }                    
        }

        public async Task CheckAndAwardQuizCompletionBadgesAsync(int userId)
        {
            try
            {
                var completedQuizzesCount = await _context.Quizzes
                 .CountAsync(q => q.UserId == userId);

                if (completedQuizzesCount == 1)
                {
                    await AssignBadgeAsync(userId, 1);
                }

                if (completedQuizzesCount == 10)
                {
                    await AssignBadgeAsync(userId, 2);
                }

                if (completedQuizzesCount == 50)
                {
                    await AssignBadgeAsync(userId, 3); 
                }

                if (completedQuizzesCount == 100)
                {
                    await AssignBadgeAsync(userId, 4); 
                }
            }
            catch (Exception ex) when (ex is ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the CheckAndAwardQuizCompletionBadgesAsync method.");
            }          
        }

        public async Task CheckAndAwardQuizCreationBadgesAsync(int userId)
        {
            try
            {
                var createdPublicQuizzesCount = await _context.CreatedQuizzes
                    .CountAsync(q => q.UserId == userId && !q.IsPrivate);

                var createdPrivateQuizzesCount = await _context.CreatedQuizzes
                    .CountAsync(q => q.UserId == userId && q.IsPrivate);

                if (createdPublicQuizzesCount == 1)
                {
                    await AssignBadgeAsync(userId, 5);
                }

                if (createdPrivateQuizzesCount == 1)
                {
                    await AssignBadgeAsync(userId, 6);
                }

                if (createdPublicQuizzesCount == 10)
                {
                    await AssignBadgeAsync(userId, 7);
                }

                if (createdPublicQuizzesCount == 50)
                {
                    await AssignBadgeAsync(userId, 8);
                }

                if (createdPublicQuizzesCount == 100)
                {
                    await AssignBadgeAsync(userId, 9);
                }
            }
            catch (Exception ex) when (ex is ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the CheckAndAwardQuizCreationBadgesAsync method.");
            }            
        }

        public async Task CheckAndAwardLeaderBoardBadgesAsync(int userId)
        {          
            try
            {
                var leaderboardPosition = await GetUserLeaderboardPosition(userId);

                if (leaderboardPosition <= 100 && leaderboardPosition > 50)
                {
                    await AssignBadgeAsync(userId, 12);
                }

                if (leaderboardPosition <= 50 && leaderboardPosition > 10)
                {
                    await AssignBadgeAsync(userId, 13);
                }

                if (leaderboardPosition <= 10 && leaderboardPosition > 1)
                {
                    await AssignBadgeAsync(userId, 14);
                }

                if (leaderboardPosition == 1)
                {
                    await AssignBadgeAsync(userId, 15);
                }
            }
            catch (Exception ex) when (ex is ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the CheckAndAwardLeaderBoardBadgesAsync method.");
            }
        }

        private async Task<int> GetUserLeaderboardPosition(int userId)
        {
            try
            {
                // Fetch all users ordered by OverallPoints in descending order
                var users = await _context.Users.OrderByDescending(x => x.OverallPoints).ToListAsync();

                // Find the position of the specific user
                var userPosition = users.FindIndex(u => u.Id == userId) + 1;

                return userPosition;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetUserLeaderboardPosition method.");
                return -1;
            }
        }

        public async Task<IEnumerable<Badge>> GetBadgesListAsync()
        {
            try
            {
                return await _context.Badges.ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetBadgesListAsync method.");
                return Enumerable.Empty<Badge>();
            }
        }

        public async Task<IEnumerable<BadgeDto>> GetUserBadgesAsync(int userId)
        {
            var allBadges = await _context.Badges.ToListAsync();
            var userBadges = await _context.UserBadges
                .Where(ub => ub.UserId == userId)
                .Select(ub => ub.BadgeId)
                .ToListAsync();

            var badgeDtos = allBadges.Select(b => new BadgeDto
            {
                Id = b.Id,
                Name = b.Name,
                Description = b.Description,
                IsEarned = userBadges.Contains(b.Id)
            });

            return badgeDtos;
        }
    }
}

