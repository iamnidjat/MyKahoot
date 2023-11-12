using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services
{
    public interface INewsLetter
    {
        Task<IActionResult> SendingNewsAsync(string news);
    }
}
