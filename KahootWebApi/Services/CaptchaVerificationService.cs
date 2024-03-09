using Microsoft.AspNetCore.Mvc;
using reCAPTCHA.AspNetCore;

namespace KahootWebApi.Services
{
    public class CaptchaVerificationService: ICaptchaVerificationService
    {
        private readonly IRecaptchaService _recaptchaService;
        private readonly ILogger<ContactManager> _logger;

        public CaptchaVerificationService(IRecaptchaService recaptchaService, ILogger<ContactManager> logger)
        {
            _recaptchaService = recaptchaService;
            _logger = logger;
        }
        
        public async Task<IActionResult> VerifyCaptcha(string token)
        {
            var result = await _recaptchaService.Validate(token);
            if (!result.success)
            {
                _logger.LogError("Captcha is not verified.");
                return new StatusCodeResult(400);
            }

            _logger.LogError("Captcha is verified.");
            return new StatusCodeResult(200);
        }
    }
}
