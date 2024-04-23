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

        public async Task UploadResultAsync(QuizStat item)
        {
            try
            {
                _context.Quizzes.Add(item);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the UploadResultAsync method.");
            }
        }
    }
}
