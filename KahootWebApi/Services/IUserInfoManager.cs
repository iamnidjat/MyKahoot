using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IUserInfoManager
    {
        Task<User> GetUserInfoAsync(int id);
        bool IsUsernameChanged(int id);
        bool IsEmailChanged(int id);
        bool IsEmailConfirmed(int id);
    }
}
