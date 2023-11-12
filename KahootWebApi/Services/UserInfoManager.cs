using KahootWebApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace KahootWebApi.Services
{
    public class UserInfoManager : IUserInfoManager
    {
        private readonly KahootDbContext _context;

        public UserInfoManager(KahootDbContext context)
        {
            _context = context;
        }

        public async Task<bool> DoesUserExist(string username)
        {
            try
            {
                var result = await _context.Users.Where(u => u.Username == username).FirstOrDefaultAsync();

                if (result == null)
                {
                    return false;
                }

                return true;
            }
            catch (ArgumentNullException ex)
            {
                throw new Exception(ex.Message, ex);
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
                throw new Exception(ex.Message, ex);
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
                throw new Exception(ex.Message, ex);
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
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<bool> IsUsernameChanged(int id)
        {
            try
            {              
                var result = await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();

                if (DateTime.Now.Subtract((DateTime)result.DateOfChangingUsername).Days > result.DeadlineForChangingName)
                {
                    result.IsUsernameChanged = false;

                    return false;
                }

                return true;
            }
            catch (ArgumentNullException ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<bool> IsEmailChanged(int id)
        {
            try
            {
                var result = await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();

                return result!.IsEmailChanged;
            }
            catch (ArgumentNullException ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<bool> IsEmailConfirmed(string mail)
        {
            try
            {
                var result = await _context.Users.Where(u => u.Email == mail).FirstOrDefaultAsync();

                return result!.IsEmailConfirmed;
  
            }
            catch (ArgumentNullException ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
