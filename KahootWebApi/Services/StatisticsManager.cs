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
            try
            {
                return await _context.Quizzes.ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }

        public async Task<HttpResponseMessage> UploadResultAsync(QuizStat item)
        {
            try
            {
                await _context.Quizzes.AddAsync(item);

                await _context.SaveChangesAsync();

                return new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.OK
                };
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                return new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest
                };
            }
        }
    }
}
