using KahootWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services
{
    public class BarChartStatsManager : IBarChartStatsManager
    {
        private readonly KahootDbContext _context;

        public BarChartStatsManager(KahootDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<QuizStat>> DownloadResultAsync(string catType, string quizType, string level)
        {
            try
            {
                return await _context.Quizzes.OrderByDescending(x => x.Score).Take(5).Where(x => x.CategoryName == catType && x.QuizName == quizType && x.Level == level).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }
    }
}
