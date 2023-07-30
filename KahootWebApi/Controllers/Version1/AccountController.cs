using KahootWebApi.Models;
using KahootWebApi.ViewModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using KahootWebApi.Services;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using BC = BCrypt.Net.BCrypt;

namespace KahootWebApi.Controllers.v1
{
    [ApiController]
    [Route("api/v1/Account/")]
    public class AccountController : ControllerBase
    {
        private readonly KahootDbContext _context;
        private readonly IAccountManager _manager;

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
                user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.UserName);

                if (user != null && BC.EnhancedVerify(model.Password, user!.Password, HashType.SHA512))
                {
                    await AuthenticateAsync(model.UserName!);                    
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

                if (user == null && model.Birthday < DateTime.Now.AddYears(-16) && Validators.IsEmailValid(model.Email!))
                {
                    _context.Users.Add(new User
                    {
                        Username = model.UserName,
                        Password = BC.EnhancedHashPassword(model.Password, 13, HashType.SHA512),
                        Email = model.Email,
                        Birthday = model.Birthday,
                        Role = model.Role
                    });

                    await _context.SaveChangesAsync();

                    await AuthenticateAsync(model.UserName!);

                    newUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.UserName);
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
        public async Task<IActionResult> ResetPassword(string email)
        {
            return await _manager.ResetPasswordAsync(email);
        }

        [HttpPatch("ChangePassword")]
        public async Task<HttpResponseMessage> ChangePassword(string login, string oldPassword, string newPassword)
        {
            return await _manager.ChangePasswordAsync(login, oldPassword, newPassword);
        }

        [HttpPatch("ChangeBirthday")]
        public async Task<HttpResponseMessage> ChangeBirthday(string login, DateTime oldBirthday, DateTime newBirthday)
        {
            return await _manager.ChangeBirthdayAsync(login, oldBirthday, newBirthday);
        }

        [HttpGet("GetRandomLogin")]
        public string GetRandomLogin()
        {
            return _manager.RandomLoginGenerator();
        }

        [HttpPost("DeleteAcc")]
        public async Task DeleteAcc(int userId, DeletedAccount deletedAccount)
        {
            await _manager.DeleteAccAsync(userId, deletedAccount);
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