using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IQuizManager
    {
        Task<Quiz> ReadQuizAsync(int quizId);
        Task<Quiz> CreateQuizAsync(string[] questions);
        Task<Quiz> UpdateQuizAsync(Quiz quiz);
        Task DeleteQuizAsync(int quizId);
        Task<Quiz> SearchQuizByTitle(string quizTitle);
        Task<IEnumerable<Quiz>> SearchQuizByCategories(string quizType);
        Task<IEnumerable<Quiz>> FilterQuizzesAsync(bool asc);
    }
}
