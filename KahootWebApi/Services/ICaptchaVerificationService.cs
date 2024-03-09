using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services
{
    public interface ICaptchaVerificationService
    {
        Task<IActionResult> VerifyCaptcha(string token);
    }
}
