using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;

namespace KahootWebApi.Services.Interfaces
{
    public interface IInteractionService
    {
        Task<IEnumerable<CommentDto>> GetCommentsAsync(int quizId);
        Task<IEnumerable<Comment>> GetCommentAsync(int userId, int quizId);
        Task AddCommentAsync(Comment comment);
        Task AddLikeAsync(Like like);
        Task AddDislikeAsync(Dislike dislike);
        Task RemoveCommentAsync(int authorId, int quizId);
        Task RemoveLikeAsync(int authorId, int quizId);
        Task RemoveDislikeAsync(int authorId, int quizId);
        Task<int> GetLikesCountAsync(int quizId);
        Task<int> GetDislikesCountAsync(int quizId);
        Task<int> GetCommentsCountAsync(int quizId);
        Task<double> GetAverageFeedbackScoreAsync(int quizId);
        Task<int> GetTimesPassedAsync(int quizId);
        Task<bool> DidUserLikeQuizAsync(int userId, int quizId);
        Task<bool> DidUserDislikeQuizAsync(int userId, int quizId);
    }
}
