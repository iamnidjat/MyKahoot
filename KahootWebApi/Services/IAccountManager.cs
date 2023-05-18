using KahootWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;

namespace KahootWebApi.Services
{
    public interface IAccountManager
    {
        Task<IActionResult> ResetPasswordAsync(string email); // !
        Task<HttpResponseMessage> ChangePasswordAsync(string login, string oldPassword, string newPassword);
        Task<HttpResponseMessage> ChangeBirthdayAsync(string login, DateTime oldBirthday, DateTime newBirthday);
    }
}
