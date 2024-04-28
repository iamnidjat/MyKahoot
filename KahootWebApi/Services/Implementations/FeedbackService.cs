using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services.Implementations
{
    public class FeedbackService: IFeedbackService
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<FeedbackService> _logger;

        public FeedbackService(KahootDbContext context, ILogger<FeedbackService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task SendQuizFeedbackAsync(Feedback feedback)
        {
            try
            {
                await _context.Feedbacks.AddAsync(feedback);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the SendQuizFeedback method.");
            }
        }
    }
}
