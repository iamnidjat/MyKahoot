using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services.Interfaces
{
    public interface IAdminManager
    {
        Task<string[]> SendCredentialsAsync(string email);
    }
}
