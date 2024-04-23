using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services.Implementations
{
    public class InteractionService: IInteractionService
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<InteractionService> _logger;

        public InteractionService(KahootDbContext context, ILogger<InteractionService> logger)
        {
            _context = context;
            _logger = logger;
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
                _logger.LogError(ex, "An error occurred in the AddComment method.");
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
                _logger.LogError(ex, "An error occurred in the AddLike method.");
            }
        }
    }
}
