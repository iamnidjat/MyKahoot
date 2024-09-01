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

                await UpdatingCreatedQuizFieldsAsync(feedback.CategoryName!, feedback.QuizName!);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the SendQuizFeedback method.");
            }
        }

        private async Task UpdatingCreatedQuizFieldsAsync(string categoryName, string quizName)
        {
            try
            {
                // Retrieving all feedback entries for the specified quiz by category name and quiz name
                var feedbackScores = await _context.Feedbacks
                    .Where(f => f.CategoryName == categoryName && f.QuizName == quizName)
                    .Select(f => f.FeedbackScore)
                    .ToListAsync();

                // Calculating the average of feedback scores and times passed 
                var nonZeroFeedbackScores = feedbackScores.Where(score => score > 0).ToList();
                double averageFeedbackScore = nonZeroFeedbackScores.Any() ? nonZeroFeedbackScores.Average() : 0;
                int timesPassed = feedbackScores.Any() ? feedbackScores.Count() : 0;

                var updateCreatedQuizFields = await _context.CreatedQuizzes.FirstOrDefaultAsync(cq => cq.CategoryName == categoryName && cq.QuizName == quizName);

                if (updateCreatedQuizFields != null)
                {
                    updateCreatedQuizFields.TimesPassed = timesPassed;
                    updateCreatedQuizFields.AverageFeedbackScore = averageFeedbackScore;
                }
                else
                {
                    _logger.LogError($"There is no created q                                                                                                                                uiz with the {categoryName} category name and {quizName} quiz name.");
                }
            }
            catch (Exception ex) when (ex is ArgumentNullException or OverflowException)
            {
                _logger.LogError(ex, "An error occurred in the UpdateAverageFeedbackScoreAsync method.");
            }
        }
    }
}
