using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services.Implementations
{
    public class ReminderService : IReminderService
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<ReminderService> _logger;

        public ReminderService(KahootDbContext context, ILogger<ReminderService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task SetReminderAsync(Reminder reminder)
        {
            try
            {              
                await _context.Reminders.AddAsync(reminder);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the SetReminderAsync method.");
            }
        }

        public async Task<IEnumerable<Reminder>> GetRemindersAsync(int userId)
        {
            try
            {
                var reminders = await _context.Reminders
                                              .AsNoTracking()
                                              .Where(r => r.UserId == userId)
                                              .ToListAsync();
                return reminders;
            }
            catch (Exception ex) when (ex is OperationCanceledException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the GetRemindersAsync method.");
                return Enumerable.Empty<Reminder>();
            }
        }

        public async Task RemoveReminderAsync(int reminderId)
        {
            try
            {
                var reminder = await _context.Reminders
                                             .AsNoTracking()
                                             .FirstOrDefaultAsync(r => r.Id == reminderId);

                if (reminder != null)
                {
                    _context.Reminders.Remove(reminder);

                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogWarning($"There is no reminder with the {reminderId} id!");
                }
            }
            catch (Exception ex) when (ex is DbUpdateConcurrencyException or DbUpdateException or OperationCanceledException)
            {
                _logger.LogError(ex, "An error occurred in the RemoveReminderAsync method.");
            }
        }

        public async Task<bool> DoesUserHaveReminderAsync(int userId)
        {
            try
            {
                var reminderExists = await _context.Reminders
                                                   .AsNoTracking()
                                                   .AnyAsync(r => r.UserId == userId && r.WhenToPass == DateTime.Now);

                if (!reminderExists)
                {
                    _logger.LogWarning($"There is no reminder for the user with the {userId} id!");
                }

                return reminderExists;
            }
            catch (Exception ex) when (ex is DbUpdateConcurrencyException or DbUpdateException or OperationCanceledException or ArgumentNullException)
            {
                _logger.LogError(ex, "An error occurred in the DoesUserHaveReminderAsync method.");
                return false;
            }
        }
    }
}
