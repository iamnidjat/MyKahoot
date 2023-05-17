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

        public async Task<IEnumerable<QuizStat>> DownloadResultAsync(int userId)
        {
            try
            {
                return await _context.Quizzes.Where(x => x.UserId == userId).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }

        public QuizStat UploadResultAsync(QuizStat item)
        {
            try
            {
                var result = _context.Quizzes.Add(item);

                 _context.SaveChangesAsync();

                return result.Entity;
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
