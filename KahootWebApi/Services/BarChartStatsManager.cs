using KahootWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services
{
    public class BarChartStatsManager : IBarChartStatsManager
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<BarChartStatsManager> _logger;

        public BarChartStatsManager(KahootDbContext context, ILogger<BarChartStatsManager> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<QuizStat>> DownloadResultAsync(string catType, string quizType, string level)
        {
            try
            {
                return await _context.Quizzes.OrderByDescending(x => x.Score).Take(5).Where(x => x.CategoryName == catType && x.QuizName == quizType && x.Level == level).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the DownloadResultAsync method.");
                return Enumerable.Empty<QuizStat>();
            }
        }
    }
}
