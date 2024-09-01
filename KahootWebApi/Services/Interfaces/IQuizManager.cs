using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;

namespace KahootWebApi.Services.Interfaces
{
    public interface IQuizManager
    {
        Task<bool> IsCategoryNameUsedAsync(string catName);
        Task<bool> IsQuizNameUsedAsync(string catName, string quizName);
        Task DeleteQuizAsync(string categoryName, string testName);
        Task AddQuestionAsync(QuizUploadDto quizDto);
        Task<IEnumerable<Quiz>> ReadQuestionsAsync(string catName, string quizName);
        Task RemoveQuestionsAsync(string catName, string quizName);
        Task UpdateQuestionAsync(string catName, string quizName, int questionNumber, QuizUploadDto quizDto);
        Task SaveCategoryAsync(CreatedQuiz createdQuiz);
        Task<ResultModel> CanUserPassVIPQuizAsync(int userId);
        Task<ResultModel> CanUserCreateVIPQuizAsync(int userId);
        Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync();
        Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync(int userId);
        Task<Quiz> GetTestDataAsync(string catName, string quizName, int questionNumber);
        Task<int> GetCorrectAnswerAsync(string catName, string quizName, int questionNumber);
        Task RemoveQuestionAsync(string catName, string quizName, int questionNumber);
        Task<IEnumerable<CreatedQuiz>> GetTestsListAsync(string categoryName);
        Task<IEnumerable<CreatedQuiz>> GetPrivateTestsListAsync(string categoryName);
        Task<IEnumerable<QuizStat>> GetPassedTestsListAsync(string categoryName, int userId);
        string GenerateCode();
        Task<string> GetGeneratedCodeAsync(string categoryName, string testName);
        Task<bool> CheckCodeAsync(string categoryName, string testName, string userCode);
        Task<bool> GetQuizModeAsync(string categoryName, string quizName);
        Task<bool> CheckOwnerOfPrivateTestAsync(string categoryName, string testName, string userName);
        Task AddQuizHistoryAsync(MyQuizAnswers myQuizAnswers);
        Task RemoveUserAnswerAsync(string catName, string quizName, int questionNumber);
        Task RemoveUserAnswersAsync(string catName, string quizName);
        Task<MyQuizAnswers> GetQuizHistoryAsync(string catName, string quizName, int questionNumber, int userId);
        Task<bool> IsAllowedUsersToDownloadAsync(string catName, string quizName);
    }
}
