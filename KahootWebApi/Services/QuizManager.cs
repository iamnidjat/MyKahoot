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

        public async Task<IEnumerable<Quiz>> ReadQuestionsAsync(string quizName)
        {
            try
            {
                return await _context.Questions.Where(x => x.QuizName == quizName).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }

        public async Task AddQuestionAsync(Quiz question)
        {
            try
            {
                _context.Questions.Add(question);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task UpdateQuestionAsync(string question, Quiz quiz)
        {
            var data = await _context.Questions.Where(x => x.Question == question).FirstOrDefaultAsync();

            if (data != null)
            {
                try
                {
                    data.QuizType = quiz.QuizType;
                    data.QuizName = quiz.QuizName;
                    data.Question = quiz.Question;
                    data.Option1 = quiz.Option1;
                    data.Option2 = quiz.Option2;
                    data.Option3 = quiz.Option3;
                    data.Option4 = quiz.Option4;
                    data.Answer = quiz.Answer;

                    await _context.SaveChangesAsync();
                }
                catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
                {
                    throw new Exception(ex.Message, ex);
                }
            }
        }

        public async Task RemoveQuestionAsync(string quizName, string question)
        {
            var questionToDelete = await FindQuestion(quizName, question);

            try
            {
                _context.Questions.Remove(questionToDelete);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task RemoveQuestionsAsync(string quizName)
        {
            var questions = await FindQuestions(quizName);

            try
            {
                _context.Questions.RemoveRange(questions);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task DeleteQuizAsync(string categoryName, string testName)
        {
            try
            {
                var quiz = await GetQuizAsync(categoryName, testName);

                var questions = await GetQuestionsAsync(categoryName, testName);

                if (quiz != null && questions != null)
                {
                    _context.CreatedQuizzes.Remove(quiz!);

                    _context.Questions.RemoveRange(questions!);

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex) when (ex is DbUpdateConcurrencyException or DbUpdateException or OperationCanceledException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<CreatedQuiz>> GetTestsListAsync(string categoryName)
        {
            try
            {
                return await _context.CreatedQuizzes.Where(u => u.CategoryName == categoryName).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }

        public async Task SaveCategoryAsync(CreatedQuiz createdQuiz)
        {
            try
            {
                _context.CreatedQuizzes.Add(createdQuiz);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync()
        {
            try
            {
                return await _context.CreatedQuizzes.ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync(int userId)
        {
            try
            {
                return await _context.CreatedQuizzes.Where(u => u.Id == userId).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }

        public async Task<Quiz> GetTestDataAsync(string quizName)
        {
            try
            {
                return await _context.Questions.Where(u => u.QuizName == quizName).FirstOrDefaultAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<int> GetCorrectAnswer(int questionNumber)
        {
            try
            {
                return await _context.Questions.Where(u => u.QuestionNumber == questionNumber).Select(u => u.Answer).FirstOrDefaultAsync();
            }
            catch (ArgumentNullException ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        private async Task<CreatedQuiz?> GetQuizAsync(string categoryName, string testName)
        {
            try
            {
                return await _context.CreatedQuizzes.SingleOrDefaultAsync(x => x.CategoryName == categoryName && x.QuizName == testName);
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException or InvalidOperationException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        private async Task<IEnumerable<Quiz?>> GetQuestionsAsync(string categoryName, string testName)
        {
            try
            {
                return await _context.Questions.Where(x => x.QuizType == categoryName && x.QuizName == testName).ToListAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException or InvalidOperationException)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        private async Task<IEnumerable<Quiz>> FindQuestions(string quizName)
        {
            try
            {
                return await _context.Questions.Where(x => x.QuizName == quizName).ToListAsync();
            }
            catch(ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }

        private async Task<Quiz> FindQuestion(string quizName, string question)
        {
            try
            {
                return await _context.Questions.FirstOrDefaultAsync(x => x.QuizName == quizName && x.Question == question);
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }
    }
}
