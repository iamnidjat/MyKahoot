using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IQuizManager
    {
        Task DeleteQuizAsync(string categoryName, string testName);
        Task AddQuestionAsync(Quiz question);
        Task<IEnumerable<Quiz>> ReadQuestionsAsync(string quizName);
        Task RemoveQuestionsAsync(string quizName);
        Task UpdateQuestionAsync(string question, Quiz quiz);
        Task SaveCategoryAsync(CreatedQuiz createdQuiz);
        Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync();
        Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync(int userId);
        Task<Quiz> GetTestDataAsync(string quizName);
        Task<int> GetCorrectAnswer(int questionNumber);
        Task RemoveQuestionAsync(string quizName, string question);
        Task<IEnumerable<CreatedQuiz>> GetTestsListAsync(string categoryName);
    }
}
