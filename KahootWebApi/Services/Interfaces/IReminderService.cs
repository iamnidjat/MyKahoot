using KahootWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services.Interfaces
{
    public interface IReminderService
    {
        Task SetReminderAsync(Reminder reminder);
        Task<IEnumerable<Reminder>> GetRemindersAsync(int userId);
        Task RemoveReminderAsync(int reminderId);
        Task<bool> DoesUserHaveReminderAsync(int userId);
    }
}
