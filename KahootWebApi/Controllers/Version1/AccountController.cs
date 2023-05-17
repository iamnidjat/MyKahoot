using KahootWebApi.Models;
using KahootWebApi.ViewModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using KahootWebApi.Services;
using Microsoft.EntityFrameworkCore;
using System.Runtime.ConstrainedExecution;


namespace KahootWebApi.Controllers.v1
{
    [ApiController]
    [Route("api/v1/Account/")]
    public class AccountController : ControllerBase
    {
        private readonly KahootDbContext _context;
        private readonly IAccountManager _manager;
       // private int userId;

        public AccountController(IAccountManager manager, KahootDbContext context)
        {
            _context = context;
            _manager = manager;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            User? user;

            try
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.UserName && u.Password == model.Password);

                if (user != null)
                {
                    await AuthenticateAsync(model.UserName!);

                    //userId = user.Id;
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (ArgumentNullException) 
            {
                return BadRequest();
            }

            return Ok(user);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            User? newUser;
            try
            {
                User? user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.UserName);

                if (user == null && model.Birthday < DateTime.Now && AccountManager.IsValid(model.Email!))
                {
                    _context.Users.Add(new User
                    {
                        Username = model.UserName,
                        Password = model.Password,
                        Email = model.Email,
                        Birthday = model.Birthday
                    });

                    await _context.SaveChangesAsync();

                    await AuthenticateAsync(model.UserName!);

                    newUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.UserName && u.Password == model.Password);

                    //if (newUser != null)
                    //{
                    //    userId = newUser.Id;
                    //}
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (ArgumentNullException)
            {
                return BadRequest();
            }

            return Ok(newUser);
        }

        [HttpGet("Logout")]
        public async Task Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpPost("ResetPassword")]
        public async Task<HttpResponseMessage> ResetPassword(string email)
        {
            return await _manager.ResetPasswordAsync(email);
        }

        [HttpPatch("ChangePassword")]
      //  [Authorize]
        public async Task<HttpResponseMessage> ChangePassword(string login, string oldPassword, string newPassword)
        {
            return await _manager.ChangePasswordAsync(login, oldPassword, newPassword);
        }

        [HttpPatch("ChangeBirthday")]
      //  [Authorize]
        public async Task<HttpResponseMessage> ChangeBirthday(string login, DateTime oldBirthday, DateTime newBirthday)
        {
            return await _manager.ChangeBirthdayAsync(login, oldBirthday, newBirthday);
        }

        private async Task AuthenticateAsync(string userName)
        {
            try
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
                };

                ClaimsIdentity id = new (claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message, ex);
            }
        }
    }
}