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

        public bool IsUsernameChanged(int id)
        {
            try
            {
                var result = _context.Users.Where(u => u.Id == id).FirstOrDefault();

                return result!.IsUsernameChanged;
            }
            catch (ArgumentNullException ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public bool IsEmailChanged(int id)
        {
            try
            {
                var result = _context.Users.Where(u => u.Id == id).FirstOrDefault();

                return result!.IsEmailChanged;
            }
            catch (ArgumentNullException ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public bool IsEmailConfirmed(int id)
        {
            try
            {
                var result = _context.Users.Where(u => u.Id == id).FirstOrDefault();

                return result!.IsEmailConfirmed;
  
            }
            catch (ArgumentNullException ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
