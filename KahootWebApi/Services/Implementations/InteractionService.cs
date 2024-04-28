using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services.Implementations
{
    public class InteractionService : IInteractionService
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<InteractionService> _logger;

        public InteractionService(KahootDbContext context, ILogger<InteractionService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Comment>> GetCommentsAsync(int quizId)
        {
            try
            {
                var comments = await _context.Comments.Where(c => c.QuizId == quizId).ToListAsync();
                return comments;
            }
            catch (Exception ex) when(ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the GetCommentsAsync method.");
                return Enumerable.Empty<Comment>();
            }
        }

        public async Task AddCommentAsync(Comment comment)
        {        
            try
            {
                await _context.Comments.AddAsync(comment);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the AddCommentAsync method.");
            }
        }

        public async Task AddLikeAsync(Like like)
        {
            try
            {
                await _context.Likes.AddAsync(like);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the AddLikeAsync method.");
            }
        }

        public async Task AddDislikeAsync(Dislike dislike)
        {
            try
            {
                await _context.Dislikes.AddAsync(dislike);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the AddDislikeAsync method.");
            }
        }

        public async Task RemoveLikeAsync(int authorId)
        {
            try
            {
                var like = await _context.Likes.FirstOrDefaultAsync(d => d.AuthorId == authorId);
                _context.Likes.Remove(like);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the RemoveLikeAsync method.");
            }
        }

        public async Task RemoveDislikeAsync(int authorId)
        {
            try
            {
                var dislike = await _context.Dislikes.FirstOrDefaultAsync(d => d.AuthorId == authorId);
                _context.Dislikes.Remove(dislike);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the RemoveDislikeAsync method.");
            }
        }

        public async Task RemoveCommentAsync(int authorId)
        {
            try
            {
                var comment = await _context.Comments.FirstOrDefaultAsync(d => d.AuthorId == authorId);
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the RemoveCommentAsync method.");
            }
        }

        public async Task<int> GetLikesCountAsync(int quizId)
        {
            try
            {
                var likesCount = await _context.Likes.Where(l => l.QuizId == quizId).CountAsync();
                return likesCount;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetLikesCountAsync method.");
                return -1;
            }
        }

        public async Task<int> GetDislikesCountAsync(int quizId)
        {
            try
            {
                var dislikesCount = await _context.Dislikes.Where(l => l.QuizId == quizId).CountAsync();
                return dislikesCount;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetDislikesCountAsync method.");
                return -1;
            }
        }

        public async Task<int> GetCommentsCountAsync(int quizId)
        {
            try
            {
                var commentsCount = await _context.Comments.Where(l => l.QuizId == quizId).CountAsync();
                return commentsCount;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetCommentsCountAsync method.");
                return -1;
            }
        }

        public async Task<bool> DidUserLikeQuizAsync(int userId)
        {
            return false;
        }

        public async Task<bool> DidUserDislikeQuizAsync(int userId)
        {
            return false;
        }
    }
}
