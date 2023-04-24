using KahootWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services
{
    public class StatisticsManager : IStatisticsManager
    {
        private readonly KahootDbContext _context;

        public StatisticsManager(KahootDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<QuizStat>> DownloadResultAsync()
        {
            return await _context.Quizzes.ToListAsync();
        }

        public async Task UploadResultAsync(QuizStat item)
        {
            await _context.Quizzes.AddAsync(item);

            await _context.SaveChangesAsync();
        }
    }
}
