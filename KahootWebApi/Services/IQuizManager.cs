using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IQuizManager
    {
        Task<Quiz> ReadQuizAsync(int quizId);
        Task<Quiz> CreateQuizAsync(string[] questions);
        Task<Quiz> UpdateQuizAsync(Quiz quiz);
        Task DeleteQuizAsync(int quizId);
    }
}
