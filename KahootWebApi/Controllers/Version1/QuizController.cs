using KahootWebApi.Models;
using KahootWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/Quiz/")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IQuizManager _manager;

        public QuizController(IQuizManager manager)
        {
            _manager = manager;
        }

        [HttpGet("ReadQuestions")]
        public async Task<IEnumerable<Quiz>> ReadQuestions(string quizName)
        {
            return await _manager.ReadQuestionsAsync(quizName);
        }

        [HttpPost("AddQuestion")]
        public async Task AddQuestion(Quiz question)
        {
            await _manager.AddQuestionAsync(question);
        }

        [HttpDelete("RemoveQuestions")]
        public async Task RemoveQuestions(string quizname)
        {
            await _manager.RemoveQuestionsAsync(quizname);
        }

        [HttpDelete("RemoveQuestion")]
        public async Task RemoveQuestion(string quizname, string question)
        {
            await _manager.RemoveQuestionAsync(quizname, question);
        }

        [HttpPatch("UpdateQuestion")]
        public async Task UpdateQuestion(string question, Quiz quiz)
        {
            await _manager.UpdateQuestionAsync(question, quiz);
        }

        [HttpDelete("DeleteQuiz")]
        public async Task DeleteQuiz(string categoryName, string testName)
        {
            await _manager.DeleteQuizAsync(categoryName, testName);
        }

        [HttpGet("GetTestsList")]
        public async Task<IEnumerable<CreatedQuiz>> GetTestsList(string categoryName)
        {
            return await _manager.GetTestsListAsync(categoryName);
        }

        [HttpGet("DownloadMyQuizzes")]
        public async Task<IEnumerable<CreatedQuiz>> DownloadCategory(int userId)
        {
            return await _manager.DownloadCategoryAsync(userId);
        }

        [HttpGet("DownloadCategory")]
        public async Task<IEnumerable<CreatedQuiz>> DownloadCategory()
        {
            return await _manager.DownloadCategoryAsync();
        }

        [HttpPost("SaveCategory")]
        public async Task SaveCategory(CreatedQuiz quiz)
        {
            await _manager.SaveCategoryAsync(quiz);
        } 

        [HttpGet("GetTestData")]
        public async Task<Quiz> GetTestData(string quizName)
        {
            return await _manager.GetTestDataAsync(quizName);
        }

        [HttpGet("GetCorrectAnswer")]
        public async Task<int> GetCorrectAnswer(int questionNumber)
        {
            return await _manager.GetCorrectAnswer(questionNumber);
        }
    }
}
