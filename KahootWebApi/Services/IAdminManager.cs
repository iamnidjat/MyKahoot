using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services
{
    public interface IAdminManager
    {
        Task<string[]> SendCredentialsAsync(string email);
    }
}
