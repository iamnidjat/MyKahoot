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

        public async Task<IEnumerable<QuizStat>> DownloadResultAsync(string quizType)
        {
            try
            {
                return await _context.Quizzes.OrderByDescending(x => x.Score).Take(5).Where(x => x.QuizName == quizType).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }
    }
}
