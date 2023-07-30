﻿using KahootWebApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/MailConfirmation/")]
    [ApiController]
    public class MailConfirmationController : ControllerBase
    {
        private readonly IMailConfirmationManager _manager;

        public MailConfirmationController(IMailConfirmationManager manager)
        {
            _manager = manager;
        }

        [HttpPost("ConfirmEmail")]
        public async Task<IActionResult> EmailConfirmationAsync(string email, int userId)
        {
            return await _manager.EmailConfirmationAsync(email, userId);
        }
    }
}
