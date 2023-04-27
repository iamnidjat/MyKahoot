using KahootWebApi.ViewModels;
using Microsoft.Win32;

namespace KahootWebApi.Services
{
    public interface IAccountManager
    {
        Task<HttpResponseMessage> ResetPasswordAsync(string email);
        Task<HttpResponseMessage> ChangePasswordAsync(int userId, string oldPassword, string newPassword);
        Task<HttpResponseMessage> ChangeBirthdayAsync(int userId, DateTime oldBirthday, DateTime newBirthday);
    }
}
