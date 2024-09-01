using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/CaptchaVerification/")]
    [ApiController]
    public class CaptchaVerificationController : ControllerBase
    {
        private readonly ICaptchaVerificationService _captchaVerificationService;

        public CaptchaVerificationController(ICaptchaVerificationService captchaVerificationService)
        {
            _captchaVerificationService = captchaVerificationService;
        }

        [HttpPost("verify-captcha")]
        public async Task<IActionResult> VerifyCaptchaAsync([FromQuery] string token)
        {
            return await _captchaVerificationService.VerifyCaptchaAsync(token);
        }
    }
}
