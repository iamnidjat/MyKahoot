using KahootWebApi.Models;
using KahootWebApi.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using static KahootWebApi.Services.Implementations.ItemStoreManager;

namespace KahootWebApi.Services.Interfaces
{
    public interface IAdminManager
    {
        Task<string> SendCredentialsAsync(string email);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<IEnumerable<User>> GetAllBannedUsersAsync();
        Task<IEnumerable<CreatedQuiz>> GetAllQuizzesAsync();
        Task BanUserAsync(int userId);
        Task<ResultModel> UnbanUserAsync(int userId);
        Task<bool> IsUserBannedAsync(int userId);
        Task DeleteQuizAsync(int quizId);
        Task<IActionResult> SendMessageToEmailAsync(string email, string title, string body);
        Task AddItemToStoreAsync(ItemToBuyDto itemDto);
        Task RemoveItemFromStoreAsync(int itemId);
    }
}
