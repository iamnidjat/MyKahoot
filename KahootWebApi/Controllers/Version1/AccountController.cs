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
        private readonly ILogger<AccountController> _logger;

        public AccountController(IAccountManager manager, 
            KahootDbContext context, ILogger<AccountController> logger)
        {
            _context = context;
            _manager = manager;
            _logger = logger;
        }

        [HttpPost("AddSocialUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task AddSocialUser(SocialUser socialUser)
        {
            await _manager.AddSocialUser(socialUser);
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
                    return BadRequest(new { Message = "Invalid request. User does not exist." });
                }
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex, "An error occurred in the Post method.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(user);
        }

        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
                    return BadRequest(new { Message = "Invalid request. User already exists." });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the Post method.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(newUser);
        }

        [HttpGet("Logout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                return Ok("Succes");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the Get method.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("ResetPassword")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ResetPassword(string email)
        {
            return await _manager.ResetPasswordAsync(email);
        }

        [HttpPatch("ChangePassword")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ChangePassword(string login, string oldPassword, string newPassword)
        {
            return await _manager.ChangePasswordAsync(login, oldPassword, newPassword);
        }

        [HttpPatch("ChangeBirthday")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ChangeBirthday(string login, DateTime newBirthday)
        {
            return await _manager.ChangeBirthdayAsync(login, newBirthday);
        }

        [HttpGet("GetRandomLogin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public string GetRandomLogin()
        {
            return _manager.RandomLoginGenerator();
        }

        [HttpPost("DeleteAcc")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task DeleteAcc(int userId, DeletedAccount deletedAccount)
        {
            await _manager.DeleteAccAsync(userId, deletedAccount);
        }

        [HttpPost("FreezeAcc")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task FreezeAcc(int userId, string reason)
        {
            await _manager.FreezeAccAsync(userId, reason);
        }

        [HttpPost("UnfreezeAcc")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task UnfreezeAcc(int userId)
        {
            await _manager.UnfreezeAccAsync(userId);
        }

        [HttpGet("CheckStatusOfAcc")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> CheckStatusOfAcc(int userId)
        {
            return await _manager.CheckStatusOfAccAsync(userId);
        }

        [HttpGet("PasswordsMatching")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> PasswordsMatching(int userId, string password)
        {
            return await _manager.PasswordsMatching(userId, password);
        }

        //[HttpPost("SendingNotification")]
        //public async Task SendingNotification(string username, string email)
        //{
        //    await _manager.SendingNotificationAsync(username, email);
        //}

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
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during authentication.");
                Response.StatusCode = StatusCodes.Status500InternalServerError;
            }
        }
    }
}