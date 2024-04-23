using KahootWebApi.Models;

namespace KahootWebApi.Services.Interfaces
{
    public interface IInteractionService
    {
        Task AddCommentAsync(Comment comment);
        Task AddLikeAsync(Like like);
    }
}
