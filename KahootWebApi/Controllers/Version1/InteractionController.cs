using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/Interaction/")]
    [ApiController]
    public class InteractionController : ControllerBase
    {
        private readonly IInteractionService _interactionService;

        public InteractionController(IInteractionService interactionService)
        {
            _interactionService = interactionService;
        }

        [HttpGet("GetComments")]
        public async Task<IEnumerable<CommentDto>> GetCommentsAsync(int quizId)
        {
            return await _interactionService.GetCommentsAsync(quizId);
        }

        [HttpGet("GetComment")]
        public async Task<IEnumerable<Comment>> GetCommentAsync(int userId, int quizId)
        {
            return await _interactionService.GetCommentAsync(userId, quizId);
        }

        [HttpPost("AddComment")]
        public async Task AddCommentAsync([FromBody] Comment comment)
        {
            await _interactionService.AddCommentAsync(comment);
        }

        [HttpPost("AddLike")]
        public async Task AddLikeAsync([FromBody] Like like)
        {
            await _interactionService.AddLikeAsync(like);
        }

        [HttpPost("AddDislike")]
        public async Task AddDislikeAsync([FromBody] Dislike dislike)
        {
            await _interactionService.AddDislikeAsync(dislike);
        }

        [HttpDelete("RemoveComment")]
        public async Task RemoveCommentAsync([FromQuery] int authorId, [FromQuery] int quizId)
        {
            await _interactionService.RemoveCommentAsync(authorId, quizId);
        }

        [HttpDelete("RemoveLike")]
        public async Task RemoveLikeAsync([FromQuery] int authorId, [FromQuery] int quizId)
        {
            await _interactionService.RemoveLikeAsync(authorId, quizId);
        }

        [HttpDelete("RemoveDislike")]
        public async Task RemoveDislikeAsync([FromQuery] int authorId, [FromQuery] int quizId)
        {
            await _interactionService.RemoveDislikeAsync(authorId, quizId);
        }

        [HttpGet("GetLikesCount")]
        public async Task<int> GetLikesCountAsync([FromQuery] int quizId)
        {
            return await _interactionService.GetLikesCountAsync(quizId);
        }

        [HttpGet("GetDislikesCount")]
        public async Task<int> GetDislikesCountAsync([FromQuery] int quizId)
        {
            return await _interactionService.GetDislikesCountAsync(quizId);
        }

        [HttpGet("GetCommentsCount")]
        public async Task<int> GetCommentsCountAsync([FromQuery] int quizId)
        {
            return await _interactionService.GetCommentsCountAsync(quizId);
        }

        [HttpGet("GetAverageFeedbackScore")]
        public async Task<double> GetAverageFeedbackScoreAsync([FromQuery] int quizId)
        {
            return await _interactionService.GetAverageFeedbackScoreAsync(quizId);
        }

        [HttpGet("GetTimesPassed")]
        public async Task<int> GetTimesPassedAsync([FromQuery] int quizId)
        {
            return await _interactionService.GetTimesPassedAsync(quizId);
        }

        [HttpGet("DidUserLikeQuiz")]
        public async Task<bool> DidUserLikeQuizAsync([FromQuery] int userId, [FromQuery] int quizId)
        {
            return await _interactionService.DidUserLikeQuizAsync(userId, quizId);
        }

        [HttpGet("DidUserDislikeQuiz")]
        public async Task<bool> DidUserDislikeQuizAsync([FromQuery] int userId, [FromQuery] int quizId)
        {
            return await _interactionService.DidUserDislikeQuizAsync(userId, quizId);
        }
    }
}
