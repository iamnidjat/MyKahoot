using KahootWebApi.ViewModels;
using Microsoft.Win32;

namespace KahootWebApi.Services
{
    public interface IAccountManager
    {
        Task<HttpResponseMessage> ResetPasswordAsync(string email);
        Task<HttpResponseMessage> ChangePasswordAsync(string login, string oldPassword, string newPassword);
        Task<HttpResponseMessage> ChangeBirthdayAsync(string login, DateTime oldBirthday, DateTime newBirthday);
    }
}
