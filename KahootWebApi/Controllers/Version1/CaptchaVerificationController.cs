using KahootWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using reCAPTCHA.AspNetCore;

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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> VerifyCaptcha(string token)
        {
            return await _captchaVerificationService.VerifyCaptcha(token);
        }
    }
}
