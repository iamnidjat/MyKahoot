using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services.Interfaces
{
    public interface IMailConfirmationManager
    {
        Task<IActionResult> EmailConfirmationAsync(string email, int userId);
    }
}
