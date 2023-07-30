﻿using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Services
{
    public interface IContactManager
    {
        Task<IActionResult> SendFeedbackAsync(string firstName, string lastName, string email, string phoneNumber, string message);
    }
}
