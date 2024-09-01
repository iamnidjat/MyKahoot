using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/Reminder/")]
    [ApiController]
    public class ReminderController : ControllerBase
    {
        private readonly IReminderService _reminderService;

        public ReminderController(IReminderService reminderService)
        {
            _reminderService = reminderService;
        }

        [HttpPost("SetReminder")]
        public async Task SetReminderAsync([FromBody] Reminder reminder)
        {
            await _reminderService.SetReminderAsync(reminder);
        }

        [HttpGet("GetReminders")]
        public async Task<IEnumerable<Reminder>> GetRemindersAsync([FromQuery] int userId)
        {
            return await _reminderService.GetRemindersAsync(userId);
        }

        [HttpDelete("RemoveReminder")]
        public async Task RemoveReminderAsync([FromQuery] int reminderId)
        {
             await _reminderService.RemoveReminderAsync(reminderId);
        }

        [HttpGet("DoesUserHaveReminder")]
        public async Task<bool> DoesUserHaveReminderAsync([FromQuery] int userId)
        {
            return await _reminderService.DoesUserHaveReminderAsync(userId);
        }
    }
}
