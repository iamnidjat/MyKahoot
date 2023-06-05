using KahootWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services
{
    public class QuizManager : IQuizManager
    {
        private readonly KahootDbContext _context;

        public QuizManager(KahootDbContext context)
        {
            _context = context;
        }

        public async Task<Quiz> CreateQuizAsync(string[] questions)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteQuizAsync(int quizId)
        {
            try
            {
                var quiz = await GetQuizByIdAsync(quizId);

                if (quiz != null)
                {
                    var removedQuiz = _context.Questions.Remove(quiz!);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex) when (ex is DbUpdateConcurrencyException or DbUpdateException or OperationCanceledException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        private async Task<Quiz?> GetQuizByIdAsync(int? quizId)
        {
            if (quizId == null)
            {
                return null;
            }

            return await _context.Questions.SingleOrDefaultAsync(x => x.Id == quizId);
        }

        public async Task<IEnumerable<Quiz>> FilterQuizzesAsync(bool asc)
        {
            if (asc)
            {
                return await _context.Questions.OrderBy(x => x.QuizName).ToListAsync();
            }

            return await _context.Questions.OrderByDescending(x => x.QuizName).ToListAsync();
        }

        public async Task<Quiz> ReadQuizAsync(int quizId)
        {
            throw new NotImplementedException();
        }

        public async Task<Quiz> SearchQuizByTitle(string quizTitle)
        {
            try
            {
                return await _context.Questions.FirstOrDefaultAsync(x => x.QuizName == quizTitle);
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<Quiz>> SearchQuizByCategories(string quizType)
        {
            try
            {
                return await _context.Questions.Where(x => x.QuizType == quizType).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }

        public async Task<Quiz> UpdateQuizAsync(Quiz quiz)
        {
            throw new NotImplementedException();
        }
    }
}
