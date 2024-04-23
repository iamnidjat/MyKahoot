using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services.Interfaces
{
    public interface INewsLetter
    {
        Task<IActionResult> SendingNewsAsync(string news);
    }
}
