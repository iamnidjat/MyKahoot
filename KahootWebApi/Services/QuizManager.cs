using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public class QuizManager : IQuizManager
    {
        public Task CreateQuizAsync(string[] questions)
        {
            throw new NotImplementedException();
        }

        public Task DeleteQuizAsync(int quizId)
        {
            throw new NotImplementedException();
        }

        public Task FilterQuizzes()
        {
            throw new NotImplementedException();
        }

        public Task ReadQuizAsync(int quizId)
        {
            throw new NotImplementedException();
        }

        public Task SearchQuizByTitle(string quizTitle)
        {
            throw new NotImplementedException();
        }

        public Task UpdateQuizAsync(Quiz quiz)
        {
            throw new NotImplementedException();
        }
    }
}
