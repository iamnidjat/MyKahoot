using KahootWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services.Interfaces
{
    public interface IAdminManager
    {
        Task<string> SendCredentialsAsync(string email);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<IEnumerable<User>> GetAllBannedUsersAsync();
        Task<IEnumerable<CreatedQuiz>> GetAllQuizzesAsync();
        Task DeleteUserAsync(int userId);
        Task BanUserAsync(int userId);
        Task UnbanUserAsync(int userId);
        Task<bool> IsUserBannedAsync(int userId);
        Task DeleteQuizAsync(int quizId);
        Task<IActionResult> SendMessageToEmailAsync(string email, string title, string body);
        Task AddItemToStoreAsync(ItemToBuy item);
        Task RemoveItemFromStoreAsync(int itemId);
    }
}
