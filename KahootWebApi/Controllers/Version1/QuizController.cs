using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("GenerateCode")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public string GenerateCode()
        {
            return _manager.GenerateCode();
        }

        [HttpGet("GetGeneratedCode")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<string> GetGeneratedCode(string catName, string quizname)
        {
            return await _manager.GetGeneratedCodeAsync(catName, quizname);
        }

        [HttpGet("CheckCode")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> CheckCode(string catName, string quizname, string userCode)
        {
            return await _manager.CheckCodeAsync(catName, quizname, userCode);
        }

        [HttpGet("CheckOwnerOfPrivateTest")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> CheckOwnerOfPrivateTest(string catName, string quizname, string userName)
        {
            return await _manager.CheckOwnerOfPrivateTestAsync(catName, quizname, userName);
        }

        [HttpGet("IsCatNameUsed")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> IsCategoryNameUsed(string catName)
        {
            return await _manager.IsCategoryNameUsed(catName);
        }

        [HttpGet("IsQuizNameUsed")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> IsQuizNameUsed(string catName, string quizName)
        {
            return await _manager.IsQuizNameUsed(catName, quizName);
        }

        [HttpGet("GetQuizMode")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> GetQuizMode(string catName, string quizName)
        {
            return await _manager.GetQuizModeAsync(catName, quizName);
        }

        [HttpGet("ReadQuestions")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<Quiz>> ReadQuestions(string catName, string quizName)
        {
            return await _manager.ReadQuestionsAsync(catName, quizName);
        }

        [HttpPost("AddQuestion")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task AddQuestion(Quiz question)
        {
            await _manager.AddQuestionAsync(question);
        }

        [HttpDelete("RemoveQuestions")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task RemoveQuestions(string catName, string quizname)
        {
            await _manager.RemoveQuestionsAsync(catName, quizname);
        }

        [HttpDelete("RemoveQuestion")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task RemoveQuestion(string catName, string quizName, int questionNumber)
        {
            await _manager.RemoveQuestionAsync(catName, quizName, questionNumber);
        }

        [HttpPatch("UpdateQuestion")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task UpdateQuestion([FromQuery] string catName, [FromQuery] string quizName, [FromQuery] int questionNumber, [FromBody] Quiz quiz)
        {
            await _manager.UpdateQuestionAsync(catName, quizName, questionNumber, quiz);
        }

        [HttpDelete("DeleteQuiz")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task DeleteQuiz(string categoryName, string testName)
        {
            await _manager.DeleteQuizAsync(categoryName, testName);
        }

        [HttpGet("GetTestsList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<CreatedQuiz>> GetTestsList(string categoryName)
        {
            return await _manager.GetTestsListAsync(categoryName);
        }

        [HttpGet("GetPrivateTestsList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<CreatedQuiz>> GetPrivateTestsList(string categoryName)
        {
            return await _manager.GetPrivateTestsListAsync(categoryName);
        }

        [HttpGet("GetPassedTestsList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<QuizStat>> GetPassedTestsList(string categoryName, int userId)
        {
            return await _manager.GetPassedTestsListAsync(categoryName, userId);
        }

        [HttpGet("DownloadMyQuizzes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<CreatedQuiz>> DownloadCategory(int userId)
        {
            return await _manager.DownloadCategoryAsync(userId);
        }

        [HttpGet("DownloadCategory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IEnumerable<CreatedQuiz>> DownloadCategory()
        {
            return await _manager.DownloadCategoryAsync();
        }

        [HttpPost("SaveCategory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task SaveCategory(CreatedQuiz quiz)
        {
            await _manager.SaveCategoryAsync(quiz);
        } 

        [HttpGet("GetTestData")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<Quiz> GetTestData(string catName, string quizName)
        {
            return await _manager.GetTestDataAsync(catName, quizName);
        }

        [HttpGet("GetCorrectAnswer")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<int> GetCorrectAnswer(string catName, string quizName, int questionNumber)
        {
            return await _manager.GetCorrectAnswer(catName, quizName, questionNumber);
        }
    }
}
