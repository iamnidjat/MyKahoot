using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services.Interfaces
{
    public interface ICaptchaVerificationService
    {
        Task<IActionResult> VerifyCaptchaAsync(string token);
    }
}
