using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IQuizManager
    {
        Task<bool> IsCategoryNameUsed(string catName);
        Task<bool> IsQuizNameUsed(string catName, string quizName);
        Task DeleteQuizAsync(string categoryName, string testName);
        Task AddQuestionAsync(Quiz question);
        Task<IEnumerable<Quiz>> ReadQuestionsAsync(string catName, string quizName);
        Task RemoveQuestionsAsync(string catName, string quizName);
        Task UpdateQuestionAsync(string catName, string quizName, int questionNumber, Quiz quiz);
        Task SaveCategoryAsync(CreatedQuiz createdQuiz);
        Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync();
        Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync(int userId);
        Task<Quiz> GetTestDataAsync(string catName, string quizName);
        Task<int> GetCorrectAnswer(string catName, string quizName, int questionNumber);
        Task RemoveQuestionAsync(string catName, string quizName, int questionNumber);
        Task<IEnumerable<CreatedQuiz>> GetTestsListAsync(string categoryName);
        Task<IEnumerable<CreatedQuiz>> GetPrivateTestsListAsync(string categoryName);
        Task<IEnumerable<QuizStat>> GetPassedTestsListAsync(string categoryName, int userId);
        string GenerateCode();
        Task<string> GetGeneratedCodeAsync(string categoryName, string testName);
        Task<bool> CheckCodeAsync(string categoryName, string testName, string userCode);
        Task<bool> GetQuizModeAsync(string categoryName, string quizName);
        Task<bool> CheckOwnerOfPrivateTestAsync(string categoryName, string testName, string userName);
    }
}
