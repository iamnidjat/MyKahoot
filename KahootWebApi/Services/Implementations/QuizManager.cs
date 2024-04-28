using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services.Implementations
{
    public class QuizManager : IQuizManager
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<QuizManager> _logger;

        public QuizManager(KahootDbContext context, ILogger<QuizManager> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> IsCategoryNameUsed(string catName)
        {
            try
            {
                bool categoryNameExists = await _context.CreatedQuizzes.AnyAsync(u => u.CategoryName == catName);

                return categoryNameExists;
            }
            catch (Exception ex) when (ex is ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the IsCategoryNameUsed method.");
                return false;
            }
        }

        public async Task<bool> IsQuizNameUsed(string catName, string quizName)
        {
            try
            {
                bool categoryNameExists = await _context.CreatedQuizzes.Where(u => u.CategoryName == catName).AnyAsync(u => u.QuizName == quizName);

                return categoryNameExists;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the IsQuizNameUsed method.");
                return false;
            }
        }

        public async Task<IEnumerable<Quiz>> ReadQuestionsAsync(string catName, string quizName)
        {
            try
            {
                return await _context.Questions.Where(x => x.QuizType == catName && x.QuizName == quizName).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the ReadQuestionsAsync method.");
                return Enumerable.Empty<Quiz>();
            }
        }

        public async Task AddQuestionAsync(Quiz question)
        {
            try
            {
                await _context.Questions.AddAsync(question);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the AddQuestionAsync method.");
            }
        }

        public async Task UpdateQuestionAsync(string catName, string quizName, int questionNumber, Quiz quiz)
        {
            var data = await _context.Questions.Where(x => x.QuizType == catName && x.QuizName == quizName && x.QuestionNumber == questionNumber).FirstOrDefaultAsync();

            if (data != null)
            {
                try
                {
                    // No need for changing category and test name
                    data.Question = quiz.Question;
                    data.Option1 = quiz.Option1;
                    data.Option2 = quiz.Option2;
                    data.Option3 = quiz.Option3;
                    data.Option4 = quiz.Option4;
                    data.Answer = quiz.Answer;
                    data.TimeToAnswer = quiz.TimeToAnswer;
                    data.Points = quiz.Points;

                    await _context.SaveChangesAsync();
                }
                catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
                {
                    _logger.LogError(ex, "An error occurred in the UpdateQuestionAsync method.");
                }
            }
        }

        public async Task RemoveQuestionAsync(string catName, string quizName, int questionNumber)
        {
            var questionToDelete = await FindQuestion(catName, quizName, questionNumber);

            try
            {
                _context.Questions.Remove(questionToDelete);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the RemoveQuestionAsync method.");
            }
        }

        public async Task RemoveQuestionsAsync(string catName, string quizName)
        {
            var questions = await FindQuestions(catName, quizName);

            try
            {
                _context.Questions.RemoveRange(questions);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the RemoveQuestionsAsync method.");
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
                _logger.LogError(ex, "An error occurred in the DeleteQuizAsync method.");
            }
        }

        public async Task<IEnumerable<CreatedQuiz>> GetTestsListAsync(string categoryName)
        {
            try
            {
                return await _context.CreatedQuizzes.Where(u => u.CategoryName == categoryName && !u.IsPrivate).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetTestsListAsync method.");
                return Enumerable.Empty<CreatedQuiz>();
            }
        }

        public async Task<IEnumerable<CreatedQuiz>> GetPrivateTestsListAsync(string categoryName)
        {
            try
            {
                return await _context.CreatedQuizzes.Where(u => u.CategoryName == categoryName && u.IsPrivate).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetPrivateTestsListAsync method.");
                return Enumerable.Empty<CreatedQuiz>();
            }
        }

        public async Task<IEnumerable<QuizStat>> GetPassedTestsListAsync(string categoryName, int userId)
        {
            try
            {
                return await _context.Quizzes.Where(u => u.CategoryName == categoryName && u.UserId == userId).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetPassedTestsListAsync method.");
                return Enumerable.Empty<QuizStat>();
            }
        }

        public async Task<bool> GetQuizModeAsync(string categoryName, string quizName)
        {
            try
            {
                return await _context.CreatedQuizzes
                    .Where(x => x.CategoryName == categoryName && x.QuizName == quizName)
                    .Select(q => q.IsPrivate)
                    .SingleOrDefaultAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetQuizModeAsync method.");
                return false;
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
                _logger.LogError(ex, "An error occurred in the SaveCategoryAsync method.");
            }
        }

        public async Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync()
        {
            try
            {
                var distinctCategories = await _context.CreatedQuizzes
                     .Include(q => q.CreatedQuizStats)
                     .GroupBy(q => q.CategoryName)
                     .Select(group => group.First())
                     .ToListAsync();

                return distinctCategories;
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException or InvalidOperationException)
            {
                _logger.LogError(ex, "An error occurred in the DownloadCategoryAsync method.");
                return Enumerable.Empty<CreatedQuiz>();
            }
        }

        public async Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync(int userId)
        {
            try
            {
                return await _context.CreatedQuizzes.Where(u => u.UserId == userId).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the DownloadCategoryAsync(int id) method.");
                return Enumerable.Empty<CreatedQuiz>();
            }
        }

        public async Task<Quiz> GetTestDataAsync(string catName, string quizName)
        {
            try
            {
                return await _context.Questions.Where(u => u.QuizType == catName && u.QuizName == quizName).FirstOrDefaultAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetTestDataAsync method.");
                return null;
            }
        }

        public async Task<int> GetCorrectAnswer(string catName, string quizName, int questionNumber)
        {
            try
            {
                return await _context.Questions.Where(u => u.QuizType == catName && u.QuizName == quizName && u.QuestionNumber == questionNumber).Select(u => u.Answer).FirstOrDefaultAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetCorrectAnswer method.");
                return -1;
            }
        }

        public string GenerateCode()
        {
            return CodeGeneratorService.GenerateCode(6);
        }

        public async Task<string> GetGeneratedCodeAsync(string categoryName, string testName)
        {
            try
            {
                return await _context.CreatedQuizzes
                    .Where(x => x.CategoryName == categoryName && x.QuizName == testName)
                    .Select(q => q.QuizCode)
                    .SingleOrDefaultAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException or InvalidOperationException)
            {
                _logger.LogError(ex, "An error occurred in the GetGeneratedCodeAsync method.");
                return string.Empty;
            }
        }

        public async Task<bool> CheckCodeAsync(string categoryName, string testName, string userCode)
        {
            string code = await GetGeneratedCodeAsync(categoryName, testName);

            if (code.ToUpper() == userCode)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> CheckOwnerOfPrivateTestAsync(string categoryName, string testName, string userName)
        {
            var quiz = await GetQuizAsync(categoryName, testName);

            if (quiz != null)
            {
                if (quiz.UserName == userName)
                {
                    return true;
                }

                return false;
            }

            return false;
        }

        public async Task<CreatedQuizStats> GetCreatedQuizStatsAsync(string catName, string quizName)
        {
            try
            {
                await UpdateAverageFeedbackScoreAsync(catName, quizName);

                return await _context.CreatedQuizzesStats.Where(u => u.CategoryName == catName && u.QuizName == quizName).FirstOrDefaultAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetCreatedQuizStats method.");
                return null;
            }
        }

        private async Task UpdateAverageFeedbackScoreAsync(string categoryName, string quizName)
        {
            try
            {
                // Retrieving all feedback entries for the specified quiz by category name and quiz name
                var feedbackScores = await _context.Feedbacks
                    .Where(f => f.CategoryName == categoryName && f.QuizName == quizName)
                    .Select(f => f.FeedbackScore)
                    .ToListAsync();

                // Calculating the average of feedback scores and times passed 
                double averageFeedbackScore = feedbackScores.Any() ? feedbackScores.Average() : 0;
                int timesPassed = feedbackScores.Any() ? feedbackScores.Count() : 0;

                // Finding the corresponding CreatedQuizStats entity
                var quizToUpdate = await _context.CreatedQuizzesStats
                    .FirstOrDefaultAsync(q => q.CategoryName == categoryName && q.QuizName == quizName);

                if (quizToUpdate != null)
                {
                    // Update the AverageFeedbackScore and TimesPassed fields
                    quizToUpdate.AverageFeedbackScore = averageFeedbackScore;
                    quizToUpdate.TimesPassed = timesPassed;

                    // Save changes to the database
                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogError($"There is no created quiz with the {categoryName} category name and {quizName} quiz name");
                }
            }
            catch (Exception ex) when (ex is ArgumentNullException or OverflowException)
            {
                _logger.LogError(ex, "An error occurred in the UpdateAverageFeedbackScoreAsync method.");
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
                _logger.LogError(ex, "An error occurred in the GetQuizAsync method.");
                return null;
            }
        }

        private async Task<IEnumerable<Quiz>> GetQuestionsAsync(string categoryName, string testName)
        {
            try
            {
                return await _context.Questions.Where(x => x.QuizType == categoryName && x.QuizName == testName).ToListAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException or InvalidOperationException)
            {
                _logger.LogError(ex, "An error occurred in the GetQuestionsAsync method.");
                return Enumerable.Empty<Quiz>();
            }
        }

        private async Task<IEnumerable<Quiz>> FindQuestions(string catName, string quizName)
        {
            try
            {
                return await _context.Questions.Where(x => x.QuizType == catName && x.QuizName == quizName).ToListAsync();
            }
            catch(ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the FindQuestions method.");
                return Enumerable.Empty<Quiz>();
            }
        }

        private async Task<Quiz> FindQuestion(string catName, string quizName, int questionNumber)
        {
            try
            {
                return await _context.Questions.FirstAsync(x => x.QuizType == catName && x.QuizName == quizName && x.QuestionNumber == questionNumber);
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the FindQuestion method.");
                return null;
            }
        }
    }
}
