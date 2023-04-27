using KahootWebApi.Models;
using KahootWebApi.ViewModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using KahootWebApi.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace KahootWebApi.Controllers.v1
{
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly KahootDbContext _context;
        private readonly IAccountManager _manager;

        public AccountController(IAccountManager manager, KahootDbContext context)
        {
            _context = context;
            _manager = manager;
        }

        [HttpPost]
        [Route("api/v1/Account/Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                User user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.UserName && u.Password == model.Password);

                if (user != null)
                {
                    await AuthenticateAsync(model.UserName);
                }

                else
                {
                    return BadRequest();
                }
            }
            catch (ArgumentNullException ex) 
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost]
        [Route("api/v1/Account/Register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            try
            {
                User user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.UserName);

                if (user == null && model.Birthday < DateTime.Now)
                {
                    _context.Users.Add(new User
                    {
                        Username = model.UserName,
                        Password = model.Password,
                        Email = model.Email,
                        Birthday = model.Birthday
                    });

                    await _context.SaveChangesAsync();

                    await AuthenticateAsync(model.UserName);
                }

                else
                {
                    return BadRequest();
                }
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet]
        [Route("api/v1/Account/Logout")]
        public async Task Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpPost]
        [Route("api/v1/Account/ResetPassword")]
        public async Task<HttpResponseMessage> ResetPassword(string email)
        {
            return await _manager.ResetPasswordAsync(email);
        }

        [HttpPatch]
        [Route("api/v1/Account/ChangePassword")]
        public async Task<HttpResponseMessage> ChangePassword(int userId, string oldPassword, string newPassword)
        {
            return await _manager.ChangePasswordAsync(userId, oldPassword, newPassword);
        }

        [HttpPatch]
        [Route("api/v1/Account/ChangeBirthday")]
        public async Task<HttpResponseMessage> ChangeBirthday(int userId, DateTime oldBirthday, DateTime newBirthday)
        {
            return await _manager.ChangeBirthdayAsync(userId, oldBirthday, newBirthday);
        }

        private async Task AuthenticateAsync(string userName)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
            };

            ClaimsIdentity id = new(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}




   