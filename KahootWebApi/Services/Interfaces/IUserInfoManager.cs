using KahootWebApi.Models;

namespace KahootWebApi.Services.Interfaces
{
    public interface IUserInfoManager
    {
        Task<User> GetUserInfoAsync(int id);
        Task<User> GetUserInfoByUsernameAsync(string username);
        Task<bool> IsUsernameChangedAsync(int id);
        Task<bool> IsEmailChangedAsync(int id);
        Task<bool> IsEmailConfirmedAsync(string mail);
        Task<bool> DoesUserExistAsync(string username);
        Task<bool> IsEmailUsedAsync(string mail);
    }
}
