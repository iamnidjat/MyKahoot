using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;
using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services.Implementations
{
    public class QuizManager : IQuizManager
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<QuizManager> _logger;
        private readonly IWebHostEnvironment _environment;

        public QuizManager(KahootDbContext context, ILogger<QuizManager> logger, IWebHostEnvironment environment)
        {
            _context = context;
            _logger = logger;
            _environment = environment;
        }

        public async Task<bool> IsCategoryNameUsedAsync(string catName)
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

        public async Task<bool> IsQuizNameUsedAsync(string catName, string quizName)
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

        public async Task AddQuestionAsync(QuizUploadDto quizDto)
        {
            var uploadPath = Path.Combine(_environment.ContentRootPath, "uploads");

            // Ensure the upload directory exists
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            try
            {
                var quiz = new Quiz
                {
                    QuizType = quizDto.QuizType,
                    QuizName = quizDto.QuizName,
                    TestFormat = quizDto.TestFormat,
                    Question = quizDto.Question,
                    Option1 = quizDto.Option1,
                    Option2 = quizDto.Option2,
                    Option3 = quizDto.Option3,
                    Option4 = quizDto.Option4,
                    Answer = quizDto.Answer,
                    QuestionNumber = quizDto.QuestionNumber,
                    TimeToAnswer = quizDto.TimeToAnswer,
                    Points = quizDto.Points
                };

                if (quizDto.Photo != null)
                {
                    var uniqueFileName = $"{Guid.NewGuid()}_{quizDto.Photo.FileName}";
                    var photoPath = Path.Combine(_environment.ContentRootPath, "uploads", uniqueFileName);
                    using (var stream = new FileStream(photoPath, FileMode.Create))
                    {
                        await quizDto.Photo.CopyToAsync(stream);
                    }
                    quiz.PhotoUrl = $"/uploads/{uniqueFileName}";
                }

                if (quizDto.Video != null)
                {
                    var uniqueFileName = $"{Guid.NewGuid()}_{quizDto.Video.FileName}";
                    var videoPath = Path.Combine(_environment.ContentRootPath, "uploads", uniqueFileName);
                    using (var stream = new FileStream(videoPath, FileMode.Create))
                    {
                        await quizDto.Video.CopyToAsync(stream);
                    }
                    quiz.VideoUrl = $"/uploads/{uniqueFileName}";
                }

                if (quizDto.Audio != null)
                {
                    var uniqueFileName = $"{Guid.NewGuid()}_{quizDto.Audio.FileName}";
                    var audioPath = Path.Combine(_environment.ContentRootPath, "uploads", uniqueFileName);
                    using (var stream = new FileStream(audioPath, FileMode.Create))
                    {
                        await quizDto.Audio.CopyToAsync(stream);
                    }
                    quiz.AudioUrl = $"/uploads/{uniqueFileName}";
                }

                await _context.Questions.AddAsync(quiz);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the AddQuestionAsync method.");
            }
        }

        public async Task UpdateQuestionAsync(string catName, string quizName, int questionNumber, QuizUploadDto quizDto)
        {
            var uploadPath = Path.Combine(_environment.ContentRootPath, "uploads");

            // Ensure the upload directory exists
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var data = await _context.Questions.Where(x => x.QuizType == catName && x.QuizName == quizName && x.QuestionNumber == questionNumber).FirstOrDefaultAsync();

            if (data != null)
            {
                try
                {
                    var quiz = new Quiz
                    {
                        QuizType = quizDto.QuizType,
                        QuizName = quizDto.QuizName,
                        TestFormat = quizDto.TestFormat,
                        Question = quizDto.Question,
                        Option1 = quizDto.Option1,
                        Option2 = quizDto.Option2,
                        Option3 = quizDto.Option3,
                        Option4 = quizDto.Option4,
                        Answer = quizDto.Answer,
                        QuestionNumber = quizDto.QuestionNumber,
                        TimeToAnswer = quizDto.TimeToAnswer,
                        Points = quizDto.Points
                    };

                    if (quizDto.Photo != null)
                    {
                        var uniqueFileName = $"{Guid.NewGuid()}_{quizDto.Photo.FileName}";
                        var photoPath = Path.Combine(_environment.ContentRootPath, "uploads", uniqueFileName);
                        using (var stream = new FileStream(photoPath, FileMode.Create))
                        {
                            await quizDto.Photo.CopyToAsync(stream);
                        }
                        data.PhotoUrl = $"/uploads/{uniqueFileName}";
                    }

                    if (quizDto.Video != null)
                    {
                        var uniqueFileName = $"{Guid.NewGuid()}_{quizDto.Video.FileName}";
                        var videoPath = Path.Combine(_environment.ContentRootPath, "uploads", uniqueFileName);
                        using (var stream = new FileStream(videoPath, FileMode.Create))
                        {
                            await quizDto.Video.CopyToAsync(stream);
                        }
                        data.VideoUrl = $"/uploads/{uniqueFileName}";
                    }

                    if (quizDto.Audio != null)
                    {
                        var uniqueFileName = $"{Guid.NewGuid()}_{quizDto.Audio.FileName}";
                        var audioPath = Path.Combine(_environment.ContentRootPath, "uploads", uniqueFileName);
                        using (var stream = new FileStream(audioPath, FileMode.Create))
                        {
                            await quizDto.Audio.CopyToAsync(stream);
                        }
                        data.AudioUrl = $"/uploads/{uniqueFileName}";
                    }

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
            else
            {
                _logger.LogError($"There is no question with the {catName} category, {questionNumber} quiz name and {questionNumber} question number.");
            }
        }

        public async Task RemoveQuestionAsync(string catName, string quizName, int questionNumber)
        {
            var questionToDelete = await FindQuestionAsync(catName, quizName, questionNumber);

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
            var questions = await FindQuestionsAsync(catName, quizName);

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
                await  _context.CreatedQuizzes.AddAsync(createdQuiz);

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == createdQuiz.UserId);

                if (createdQuiz.IsVIP)
                {
                    user.Coins -= 15;
                    if (user!.IsEmailConfirmed)
                    {
                        user.OverallPoints += 20;
                        user.Points += 20;
                    }
                }
                else
                {
                    if (user!.IsEmailConfirmed)
                    {
                        user.OverallPoints += 20;
                        user.Points += 20;
                        user.Coins += 20;
                    }
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the SaveCategoryAsync method.");
            }
        }

        public async Task<bool> IsAllowedUsersToDownloadAsync(string catName, string quizName)
        {
            try
            {
                var quiz = await _context.CreatedQuizzes.FirstOrDefaultAsync(q => q.CategoryName == catName && q.QuizName == quizName);

                return quiz.AllowedToDownload;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the IsAllowedUsersToDownloadAsync method.");
                return false;
            }
        }


        public async Task<ResultModel> CanUserCreateVIPQuizAsync(int userId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

                if (user.Coins >= 15)
                {
                    user.Coins -= 15;
                    return new ResultModel { Success = true };
                }

                _logger.LogWarning($"User {userId} does not have enough coins");
                return new ResultModel { Success = false, Reason = "insufficient_coins" };

            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the CanUserCreateVIPQuizAsync method.");
                return new ResultModel { Success = false, Reason = "server_error" };
            }
        }

        public async Task<ResultModel> CanUserPassVIPQuizAsync(int userId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

                if (user.Coins >= 15)
                {
                    user.Coins -= 15;
                    return new ResultModel { Success = true };
                }

                _logger.LogWarning($"User {userId} does not have enough coins");
                return new ResultModel { Success = false, Reason = "insufficient_coins" };
                
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the CanUserPassVIPQuizAsync method.");
                return new ResultModel { Success = false, Reason = "server_error" };
            }
        }

        public async Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync()
        {
            try
            {
                var distinctCategories = await _context.CreatedQuizzes
                     .GroupBy(q => q.CategoryName)
                     .Select(group => group.OrderByDescending(cq => cq.AverageFeedbackScore).First())
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

        public async Task<Quiz> GetTestDataAsync(string catName, string quizName, int questionNumber)
        {
            try
            {
                return await _context.Questions.Where(u => u.QuestionNumber == questionNumber && u.QuizType == catName && u.QuizName == quizName).FirstOrDefaultAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetTestDataAsync method.");
                return null;
            }
        }

        public async Task<int> GetCorrectAnswerAsync(string catName, string quizName, int questionNumber)
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

        public async Task AddQuizHistoryAsync(MyQuizAnswers myQuizAnswers)
        {
            try
            {
                await _context.MyQuizAnswers.AddAsync(myQuizAnswers);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the AddQuizHistoryAsync method.");
            }
        }

        public async Task RemoveUserAnswerAsync(string catName, string quizName, int questionNumber)
        {
            var answerToDelete = await FindUserAnswerAsync(catName, quizName, questionNumber);

            if (answerToDelete != null)
            {
                try
                {
                    _context.MyQuizAnswers.Remove(answerToDelete);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
                {
                    _logger.LogError(ex, "An error occurred in the RemoveUserAnswerAsync method.");
                }
            }
            else
            {
                _logger.LogWarning($"No answer found to delete for category '{catName}', quiz '{quizName}', and question number '{questionNumber}'.");
            }
        }

        public async Task RemoveUserAnswersAsync(string catName, string quizName)
        {
            var answersToDelete = await FindUserAnswersAsync(catName, quizName);

            try
            {
                _context.MyQuizAnswers.RemoveRange(answersToDelete);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the RemoveUserAnswersAsync method.");
            }
        }

        public async Task<MyQuizAnswers> GetQuizHistoryAsync(string catName, string quizName, int questionNumber, int userId)
        {
            try
            {
                return await _context.MyQuizAnswers.Where(u => u.QuestionNumber == questionNumber && u.CategoryName == catName && u.QuizName == quizName && u.UserId == userId).FirstOrDefaultAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetQuizHistoryAsync method.");
                return null;
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

        private async Task<IEnumerable<Quiz>> FindQuestionsAsync(string catName, string quizName)
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

        private async Task<Quiz> FindQuestionAsync(string catName, string quizName, int questionNumber)
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

        private async Task<IEnumerable<MyQuizAnswers>> FindUserAnswersAsync(string catName, string quizName)
        {
            try
            {
                return await _context.MyQuizAnswers.Where(x => x.CategoryName == catName && x.QuizName == quizName).ToListAsync();
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the FindUserAnswersAsync method.");
                return Enumerable.Empty<MyQuizAnswers>();
            }
        }

        private async Task<MyQuizAnswers> FindUserAnswerAsync(string catName, string quizName, int questionNumber)
        {
            try
            {
                return await _context.MyQuizAnswers.FirstAsync(x => x.CategoryName == catName && x.QuizName == quizName && x.QuestionNumber == questionNumber);
            }
            catch (Exception ex) when (ex is ArgumentNullException or OperationCanceledException or InvalidOperationException)
            {
                _logger.LogError(ex, "An error occurred in the FindUserAnswerAsync method.");
                return null;
            }
        }
    }
}
