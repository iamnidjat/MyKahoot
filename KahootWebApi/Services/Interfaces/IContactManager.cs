using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services.Interfaces
{
    public interface IContactManager
    {
        Task<IActionResult> SendFeedbackAsync(string firstName, string lastName, string email, string phoneNumber, string message);
    }
}
