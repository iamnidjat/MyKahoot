using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IUserInfoManager
    {
        Task<User> GetUserInfoAsync(int id);
        Task<User> GetUserInfoByUsernameAsync(string username);
        Task<bool> IsUsernameChanged(int id);
        Task<bool> IsEmailChanged(int id);
        Task<bool> IsEmailConfirmed(string mail);
        Task<int> GetNextDeadlineForChangingName(int id);
        Task<bool> DoesUserExist(string username);
        Task<bool> IsEmailUsed(string mail);
    }
}
