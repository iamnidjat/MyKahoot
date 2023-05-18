using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IQuizManager
    {
        Task ReadQuizAsync(int quizId);
        Task CreateQuizAsync(string[] questions);
        Task UpdateQuizAsync(Quiz quiz);
        Task DeleteQuizAsync(int quizId);
        Task SearchQuizByTitle(string quizTitle);
        Task FilterQuizzes();
    }
}
