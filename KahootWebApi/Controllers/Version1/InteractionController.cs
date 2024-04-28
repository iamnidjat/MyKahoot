using KahootWebApi.Models;
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
        public async Task<IEnumerable<Comment>> GetCommentsAsync(int quizId)
        {
            return await _interactionService.GetCommentsAsync(quizId);
        }

        [HttpPost("AddComment")]
        public async Task AddCommentAsync(Comment comment)
        {
            await _interactionService.AddCommentAsync(comment);
        }

        [HttpPost("AddLike")]
        public async Task AddLikeAsync(Like like)
        {
            await _interactionService.AddLikeAsync(like);
        }

        [HttpPost("AddDislike")]
        public async Task AddDislikeAsync(Dislike dislike)
        {
            await _interactionService.AddDislikeAsync(dislike);
        }

        [HttpDelete("RemoveComment")]
        public async Task RemoveCommentAsync(int authorId)
        {
            await _interactionService.RemoveCommentAsync(authorId);
        }

        [HttpDelete("RemoveLike")]
        public async Task RemoveLikeAsync(int authorId)
        {
            await _interactionService.RemoveLikeAsync(authorId);
        }

        [HttpDelete("RemoveDislike")]
        public async Task RemoveDislikeAsync(int authorId)
        {
            await _interactionService.RemoveDislikeAsync(authorId);
        }

        [HttpGet("GetLikesCount")]
        public async Task<int> GetLikesCountAsync(int quizId)
        {
            return await _interactionService.GetLikesCountAsync(quizId);
        }

        [HttpGet("GetDislikesCount")]
        public async Task<int> GetDislikesCountAsync(int quizId)
        {
            return await _interactionService.GetDislikesCountAsync(quizId);
        }

        [HttpGet("GetCommentsCount")]
        public async Task<int> GetCommentsCountAsync(int quizId)
        {
            return await _interactionService.GetCommentsCountAsync(quizId);
        }

        [HttpGet("DidUserLikeQuiz")]
        public async Task<bool> DidUserLikeQuizAsync(int userId)
        {
            return await _interactionService.DidUserLikeQuizAsync(userId);
        }

        [HttpGet("DidUserDislikeQuiz")]
        public async Task<bool> DidUserDislikeQuizAsync(int userId)
        {
            return await _interactionService.DidUserDislikeQuizAsync(userId);
        }
    }
}
