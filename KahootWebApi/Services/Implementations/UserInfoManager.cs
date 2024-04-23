using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services.Implementations
{
    public class UserInfoManager : IUserInfoManager
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<StatisticsManager> _logger;

        public UserInfoManager(KahootDbContext context, ILogger<StatisticsManager> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> DoesUserExist(string username)
        {
            try
            {
                var result = await _context.Users.Where(u => u.Username == username).FirstOrDefaultAsync();

                if (result == null)
                {
                    _logger.LogWarning($"User does not exist.");
                    return false;
                }

                return true;               
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the DoesUserExist method.");
                return false;
            }
        }

        public async Task<bool> IsEmailUsed(string mail)
        {
            try
            {
                bool emailExists = await _context.Users.AnyAsync(u => u.Email == mail);

                return emailExists;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the IsEmailUsed method.");
                return false;
            }
        }

        public async Task<User> GetUserInfoAsync(int id)
        {
            try
            {
                var result = await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();

                return result!;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetUserInfoAsync method.");
                return null;
            }
        }

        public async Task<User> GetUserInfoByUsernameAsync(string username)
        {
            try
            {
                var result = await _context.Users.Where(u => u.Username == username).FirstOrDefaultAsync();

                return result!;
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetUserInfoByUsernameAsync method.");
                return null;
            }
        }

        public async Task<int> GetNextDeadlineForChangingName(int id)
        {
            try
            {
                var result = await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();

                return 90 - (DateTime.Now.Subtract((DateTime)result.DateOfChangingUsername).Days);
                
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the GetNextDeadlineForChangingName method.");
                return -1;
            }
        }

        public async Task<bool> IsUsernameChanged(int id)
        {
            try
            {                             
                var result = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

                if (result != null)
                {
                    return result.IsUsernameChanged;
                }
                else
                {
                    _logger.LogWarning($"User not found.");
                    return false;
                }
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the IsUsernameChanged method.");
                return false;
            }
        }

        public async Task<bool> IsEmailChanged(int id)
        {
            try
            {                
                var result = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

                if (result != null)
                {
                    return result.IsEmailChanged;
                }
                else
                {
                    _logger.LogWarning($"User not found.");
                    return false;
                }
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the IsEmailChanged method.");
                return false;
            }
        }

        public async Task<bool> IsEmailConfirmed(string mail)
        {
            try
            {
                var result = await _context.Users.FirstOrDefaultAsync(u => u.Email == mail);

                if (result != null)
                {
                    return result.IsEmailConfirmed;
                }
                else
                {
                    _logger.LogWarning($"User with email {mail} not found.");
                    return false;
                }
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the IsEmailConfirmed method.");
                return false;
            }
        }
    }
}
