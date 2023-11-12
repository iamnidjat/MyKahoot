namespace KahootWebApi.Services
{
    public interface IPhotoService
    {
        Task SavePhoto(int userId, string photoURL);
        Task<string> GetPhotoUrl(int userId);
    }
}
