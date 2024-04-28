using KahootWebApi.Models;

namespace KahootWebApi.Services.Interfaces
{
    public interface IInteractionService
    {
        Task<IEnumerable<Comment>> GetCommentsAsync(int quizId);
        Task AddCommentAsync(Comment comment);
        Task AddLikeAsync(Like like);
        Task AddDislikeAsync(Dislike dislike);
        Task RemoveCommentAsync(int authorId);
        Task RemoveLikeAsync(int authorId);
        Task RemoveDislikeAsync(int authorId);
        Task<int> GetLikesCountAsync(int quizId);
        Task<int> GetDislikesCountAsync(int quizId);
        Task<int> GetCommentsCountAsync(int quizId);
        Task<bool> DidUserLikeQuizAsync(int userId);
        Task<bool> DidUserDislikeQuizAsync(int userId);
    }
}
