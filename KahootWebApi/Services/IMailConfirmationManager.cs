using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services
{
    public interface IMailConfirmationManager
    {
        Task<IActionResult> EmailConfirmationAsync(string email, int userId);
    }
}
