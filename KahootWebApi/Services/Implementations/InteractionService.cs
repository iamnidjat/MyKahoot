using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;
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

        public async Task<IEnumerable<CommentDto>> GetCommentsAsync(int quizId)
        {
            try
            {
                //var authorName = await _context.Users.Where(u => u.Id == quizId).ToListAsync();
                //var comments = await _context.Comments.Where(c => c.CreatedQuizId == quizId).ToListAsync();
                //return comments;
                var comments = await _context.Comments
                   .Where(c => c.CreatedQuizId == quizId)
                   .Join(_context.Users,
                       comment => comment.AuthorId,
                       user => user.Id,
                       (comment, user) => new CommentDto(
                            comment.Id,
                            comment.Content,
                            comment.Date,
                            comment.AuthorId,
                            user.Username // Include the Username from the Author navigation property
                        ))
                   .ToListAsync();

                return comments;
            }
            catch (Exception ex) when(ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the GetCommentsAsync method.");
                return Enumerable.Empty<CommentDto>();
            }
        }

        public async Task<IEnumerable<Comment>> GetCommentAsync(int userId, int quizId)
        {
            try
            {
                var comments = await _context.Comments.Where(c => c.CreatedQuizId == quizId && c.AuthorId == userId).ToListAsync();
                return comments;
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
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

        public async Task UpdateCommentAsync(Comment comment, int commentId)
        {
            try
            {
                var updateComment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId);
                
                if (updateComment != null)
                {
                    updateComment.Content = comment.Content;
                    updateComment.Date = comment.Date;
                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogError($"There is no comment with the {commentId} id.");
                }                
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the UpdateCommentAsync method.");
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

        public async Task RemoveLikeAsync(int authorId, int quizId)
        {
            try
            {
                var like = await _context.Likes.FirstOrDefaultAsync(d => d.AuthorId == authorId && d.CreatedQuizId == quizId);
                _context.Likes.Remove(like);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the RemoveLikeAsync method.");
            }
        }

        public async Task RemoveDislikeAsync(int authorId, int quizId)
        {
            try
            {
                var dislike = await _context.Dislikes.FirstOrDefaultAsync(d => d.AuthorId == authorId && d.CreatedQuizId == quizId);
                _context.Dislikes.Remove(dislike);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the RemoveDislikeAsync method.");
            }
        }

        public async Task RemoveCommentAsync(int authorId, int quizId)
        {
            try
            {
                var comment = await _context.Comments.FirstOrDefaultAsync(d => d.AuthorId == authorId && d.CreatedQuizId == quizId);
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
                var likesCount = await _context.Likes.Where(l => l.CreatedQuizId == quizId).CountAsync();
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
                var dislikesCount = await _context.Dislikes.Where(l => l.CreatedQuizId == quizId).CountAsync();
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
                var commentsCount = await _context.Comments.Where(l => l.CreatedQuizId == quizId).CountAsync();
                return commentsCount;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetCommentsCountAsync method.");
                return -1;
            }
        }

        public async Task<double> GetAverageFeedbackScoreAsync(int quizId)
        {
            try
            {
                var averageFeedbackScore = await _context.CreatedQuizzes
                    .Where(q => q.Id == quizId)
                    .Select(q => q.AverageFeedbackScore)
                    .FirstOrDefaultAsync();

                return averageFeedbackScore;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetAverageFeedbackScoreAsync method.");
                return -1;
            }
        }

        public async Task<int> GetTimesPassedAsync(int quizId)
        {
            try
            {
                var timesPassed = await _context.CreatedQuizzes
                    .Where(q => q.Id == quizId)
                    .Select(q => q.TimesPassed)
                    .FirstOrDefaultAsync();

                return timesPassed;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetTimesPassedAsync method.");
                return -1;
            }
        }

        public async Task<bool> DidUserLikeQuizAsync(int userId, int quizId)
        {          
            try
            {
                // Check if there is any like record with the provided userId and quizId
                var didUserLikeQuiz = await _context.Likes
                    .AnyAsync(like => like.AuthorId == userId && like.CreatedQuizId == quizId);

                return didUserLikeQuiz;
            }
            catch (Exception ex) when (ex is ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the DidUserLikeQuizAsync method.");
                return false;
            }
        }

        public async Task<bool> DidUserDislikeQuizAsync(int userId, int quizId)
        {
            try
            {
                // Check if there is any like record with the provided userId and quizId
                var didUserDislikeQuiz = await _context.Dislikes
                    .AnyAsync(dislike => dislike.AuthorId == userId && dislike.CreatedQuizId == quizId);

                return didUserDislikeQuiz;
            }
            catch (Exception ex) when (ex is ArgumentNullException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the DidUserDislikeQuizAsync method.");
                return false;
            }
        }
    }
}
