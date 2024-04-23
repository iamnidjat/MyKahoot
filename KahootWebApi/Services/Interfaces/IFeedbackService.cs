using KahootWebApi.Models;

namespace KahootWebApi.Services.Interfaces
{
    public interface IFeedbackService
    {
        Task SendQuizFeedback(Feedback feedback);
    }
}
