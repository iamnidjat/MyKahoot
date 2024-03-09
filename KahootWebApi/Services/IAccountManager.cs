using KahootWebApi.Models;
using KahootWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;

namespace KahootWebApi.Services
{
    public interface IAccountManager
    {
        Task AddSocialUser(SocialUser socialUser);
        Task<IActionResult> ResetPasswordAsync(string email);
        Task<IActionResult> ChangePasswordAsync(string login, string oldPassword, string newPassword);
        Task<IActionResult> ChangeBirthdayAsync(string login, DateTime newBirthday);
        string RandomLoginGenerator();
        Task DeleteAccAsync(int userId, DeletedAccount deletedAccount);
        Task FreezeAccAsync(int userId, string reason);
        Task UnfreezeAccAsync(int userId);
        Task<bool> CheckStatusOfAccAsync(int userId);
        Task<bool> PasswordsMatching(int userId, string password);
        //Task<IActionResult> NotifyingAboutDeletingAsync(string email);
        //Task SendingNotificationAsync(string username, string email);
    }
}
