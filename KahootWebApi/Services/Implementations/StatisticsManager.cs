using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services.Implementations
{
    public class StatisticsManager : IStatisticsManager
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<StatisticsManager> _logger;

        public StatisticsManager(KahootDbContext context, ILogger<StatisticsManager> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<QuizStat>> DownloadResultAsync(int userId, string catType, string quizType, string level)
        {
            try
            {
                return await _context.Quizzes.Where(x => x.UserId == userId && x.QuizName == quizType && x.CategoryName == catType && x.Level == level).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the DownloadResultAsync method.");
                return Enumerable.Empty<QuizStat>();
            }
        }

        public async Task<IEnumerable<QuizStat>> DownloadResultAsync(string catType, string quizType, string level)
        {
            try
            {
                return await _context.Quizzes.OrderByDescending(x => x.Score).Take(10).Where(x => x.QuizName == quizType && x.CategoryName == catType && x.Level == level && x.IsVisible).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the DownloadResultsAsync method.");
                return Enumerable.Empty<QuizStat>();
            }
        }

        public async Task<IEnumerable<QuizStat>> DownloadTopResultAsync(int userId)
        {
            try
            {          
                var topResults = await _context.Quizzes
                        .Where(q => q.UserId == userId && q.IsVisible)
                        .ToListAsync();

                return topResults;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the DownloadTopResultAsync method.");
                return Enumerable.Empty<QuizStat>();
            }
        }

        public async Task<IEnumerable<User>> GetLeaderBoardUsersAsync()
        {
            try
            {
                return await _context.Users.OrderByDescending(x => x.OverallPoints).Take(10).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetLeaderBoardUsers method.");
                return Enumerable.Empty<User>();
            }
        }

        public async Task UploadResultAsync(QuizStat item, int quizId, string quizCreator)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == item.UserId);
                var creator = await _context.Users.FirstOrDefaultAsync(u => u.Username == quizCreator);
                var quiz = await _context.CreatedQuizzes.FirstOrDefaultAsync(q => q.Id == quizId);

                if (user!.IsEmailConfirmed)
                {
                    if (await IsNewHighScoreAsync(item.CategoryName, item.QuizName, item.Level, item.UserId, item.Score))
                    {
                        switch (item.Level)
                        {
                            case "easy":
                                user.OverallPoints += 5;
                                user.Points += 5;
                                user.Coins += 5;
                                break;
                            case "medium":
                                user.OverallPoints += 10;
                                user.Points += 10;
                                user.Coins += 5;
                                break;
                            case "hard":
                                user.OverallPoints += 15;
                                user.Points += 15;
                                user.Coins += 5;
                                break;
                        }
                    }
                }
                if (quiz?.IsVIP == true && creator != null)
                {
                    creator.Coins += 1;
                }

                await _context.Quizzes.AddAsync(item);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the UploadResultAsync method.");
            }
        }

        private async Task<bool> IsNewHighScoreAsync(string catName, string quizName, string level, int userId, int score)
        {
            try
            {
                var passedQuizzes = await _context.Quizzes.Where(q => q.CategoryName == catName && q.QuizName == quizName && q.Level == level && q.UserId == userId).ToListAsync();

                if (passedQuizzes.Any())
                {
                    return passedQuizzes.All(q => q.Score < score);
                }
                else if (score > 0) return true;

                return false;
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the IsNewHighScoreAsync method.");
                return false;
            }
        }
    }
}
