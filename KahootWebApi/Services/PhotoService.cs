using KahootWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly KahootDbContext _context;

        public PhotoService(KahootDbContext context)
        {
            _context = context;
        }

        public async Task SavePhoto(int userId, string photoURL)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();

                if (user != null)
                {
                    user.PhotoURL = photoURL;
                    await _context.SaveChangesAsync();
                }
            }
            catch (ArgumentNullException ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<string> GetPhotoUrl(int userId)
        {
            try
            {
                return await _context.Users.Where(u => u.Id == userId).Select(p => p.PhotoURL).SingleOrDefaultAsync();
            }
            catch (Exception ex) when (ex is ArgumentNullException or InvalidOperationException or OperationCanceledException)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
