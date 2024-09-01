using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;
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
        public string GenerateCode()
        {
            return _manager.GenerateCode();
        }

        [HttpGet("GetGeneratedCode")]
        public async Task<string> GetGeneratedCodeAsync([FromQuery] string catName, [FromQuery] string quizname)
        {
            return await _manager.GetGeneratedCodeAsync(catName, quizname);
        }

        [HttpGet("CheckCode")]
        public async Task<bool> CheckCodeAsync([FromQuery] string catName, [FromQuery] string quizname, [FromQuery] string userCode)
        {
            return await _manager.CheckCodeAsync(catName, quizname, userCode);
        }

        [HttpGet("CheckOwnerOfPrivateTest")]
        public async Task<bool> CheckOwnerOfPrivateTestAsync([FromQuery] string catName, [FromQuery] string quizname, [FromQuery] string userName)
        {
            return await _manager.CheckOwnerOfPrivateTestAsync(catName, quizname, userName);
        }

        [HttpGet("IsCatNameUsed")]
        public async Task<bool> IsCategoryNameUsedAsync([FromQuery] string catName)
        {
            return await _manager.IsCategoryNameUsedAsync(catName);
        }

        [HttpGet("IsQuizNameUsed")]
        public async Task<bool> IsQuizNameUsedAsync([FromQuery] string catName, [FromQuery] string quizName)
        {
            return await _manager.IsQuizNameUsedAsync(catName, quizName);
        }

        [HttpGet("GetQuizMode")]
        public async Task<bool> GetQuizModeAsync([FromQuery] string catName, [FromQuery] string quizName)
        {
            return await _manager.GetQuizModeAsync(catName, quizName);
        }

        [HttpGet("ReadQuestions")]
        public async Task<IEnumerable<Quiz>> ReadQuestionsAsync([FromQuery] string catName, [FromQuery] string quizName)
        {
            return await _manager.ReadQuestionsAsync(catName, quizName);
        }

        [HttpPost("AddQuestion")]
        public async Task AddQuestionAsync([FromForm] QuizUploadDto quizDto)
        {
            await _manager.AddQuestionAsync(quizDto);
        }

        [HttpDelete("RemoveQuestions")]
        public async Task RemoveQuestionsAsync([FromQuery] string catName, [FromQuery] string quizname)
        {
            await _manager.RemoveQuestionsAsync(catName, quizname);
        }

        [HttpDelete("RemoveQuestion")]
        public async Task RemoveQuestionAsync([FromQuery] string catName, [FromQuery] string quizName, [FromQuery] int questionNumber)
        {
            await _manager.RemoveQuestionAsync(catName, quizName, questionNumber);
        }

        [HttpPatch("UpdateQuestion")]
        [HttpPut("UpdateQuestion")]
        public async Task UpdateQuestion([FromQuery] string catName, [FromQuery] string quizName, [FromQuery] int questionNumber, [FromForm] QuizUploadDto quizDto)
        {
            await _manager.UpdateQuestionAsync(catName, quizName, questionNumber, quizDto);
        }

        [HttpDelete("DeleteQuiz")]
        public async Task DeleteQuiz([FromQuery] string categoryName, [FromQuery] string testName)
        {
            await _manager.DeleteQuizAsync(categoryName, testName);
        }

        [HttpGet("GetTestsList")]
        public async Task<IEnumerable<CreatedQuiz>> GetTestsListAsync([FromQuery] string categoryName)
        {
            return await _manager.GetTestsListAsync(categoryName);
        }

        [HttpGet("GetPrivateTestsList")]
        public async Task<IEnumerable<CreatedQuiz>> GetPrivateTestsListAsync([FromQuery] string categoryName)
        {
            return await _manager.GetPrivateTestsListAsync(categoryName);
        }

        [HttpGet("GetPassedTestsList")]
        public async Task<IEnumerable<QuizStat>> GetPassedTestsListAsync([FromQuery] string categoryName, [FromQuery] int userId)
        {
            return await _manager.GetPassedTestsListAsync(categoryName, userId);
        }

        [HttpGet("DownloadMyQuizzes")]
        public async Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync([FromQuery] int userId)
        {
            return await _manager.DownloadCategoryAsync(userId);
        }

        [HttpGet("DownloadCategory")]
        public async Task<IEnumerable<CreatedQuiz>> DownloadCategoryAsync()
        {
            return await _manager.DownloadCategoryAsync();
        }

        [HttpPost("SaveCategory")]
        public async Task SaveCategoryAsync([FromBody] CreatedQuiz quiz)
        {
            await _manager.SaveCategoryAsync(quiz);
        }

        [HttpPost("CanUserPassVIPQuiz")]
        public async Task<IActionResult> CanUserPassVIPQuizAsync([FromQuery] int userId)
        {
            var result = await _manager.CanUserPassVIPQuizAsync(userId);

            if (result.Success)
            {
                return Ok(new { success = true });
            }
            else if (result.Reason == "insufficient_coins")
            {
                return BadRequest(new { success = false, reason = "insufficient_coins" });
            }
            else
            {
                return StatusCode(500, new { success = false, reason = "server_error" });
            }
        }

        [HttpPost("CanUserCreateVIPQuiz")]
        public async Task<IActionResult> CanUserCreateVIPQuizAsync([FromQuery] int userId)
        {
            var result = await _manager.CanUserCreateVIPQuizAsync(userId);

            if (result.Success)
            {
                return Ok(new { success = true });
            }
            else if (result.Reason == "insufficient_coins")
            {
                return BadRequest(new { success = false, reason = "insufficient_coins" });
            }
            else
            {
                return StatusCode(500, new { success = false, reason = "server_error" });
            }
        }

        [HttpGet("GetTestData")]
        public async Task<Quiz> GetTestDataAsync([FromQuery] string catName, [FromQuery] string quizName, [FromQuery] int questionNumber)
        {
            return await _manager.GetTestDataAsync(catName, quizName, questionNumber);
        }

        [HttpGet("GetCorrectAnswer")]
        public async Task<int> GetCorrectAnswerAsync([FromQuery] string catName, [FromQuery] string quizName, [FromQuery] int questionNumber)
        {
            return await _manager.GetCorrectAnswerAsync(catName, quizName, questionNumber);
        }

        [HttpPost("AddQuizHistory")]
        public async Task AddQuizHistoryAsync([FromBody] MyQuizAnswers myQuizAnswers)
        {
            await _manager.AddQuizHistoryAsync(myQuizAnswers);
        }

        [HttpDelete("RemoveUserAnswer")]
        public async Task RemoveUserAnswerAsync([FromQuery] string catName, [FromQuery] string quizName, [FromQuery] int questionNumber)
        {
            await _manager.RemoveUserAnswerAsync(catName, quizName, questionNumber);
        }

        [HttpDelete("RemoveUserAnswers")]
        public async Task RemoveUserAnswersAsync([FromQuery] string catName, [FromQuery] string quizName)
        {
            await _manager.RemoveUserAnswersAsync(catName, quizName);
        }

        [HttpGet("GetQuizHistory")]
        public async Task<MyQuizAnswers> GetQuizHistoryAsync([FromQuery] string catName, [FromQuery] string quizName, [FromQuery] int questionNumber, [FromQuery] int userId)
        {
            return await _manager.GetQuizHistoryAsync(catName, quizName, questionNumber, userId);
        }

        [HttpGet("IsAllowedUsersToDownload")]
        public async Task<bool> IsAllowedUsersToDownloadAsync(string catName, string quizName)
        {
            return await _manager.IsAllowedUsersToDownloadAsync(catName, quizName);
        }
    }
}
