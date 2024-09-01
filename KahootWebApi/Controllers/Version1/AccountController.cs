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
using KahootWebApi.Services.Interfaces;
using KahootWebApi.Models.DTOs;

namespace KahootWebApi.Controllers.v1
{
    [ApiController]
    [Route("api/v1/Account/")]
    public class AccountController : ControllerBase
    {
        private readonly KahootDbContext _context;
        private readonly IAccountManager _manager;
        private readonly ILogger<AccountController> _logger;

        public AccountController(IAccountManager manager,KahootDbContext context, 
            ILogger<AccountController> logger)
        {
            _context = context;
            _manager = manager;
            _logger = logger;

        }

        [HttpPost("AddSocialUser")]
        public async Task AddSocialUserAsync([FromBody] SocialUser socialUser)
        {
            await _manager.AddSocialUserAsync(socialUser);
        }

        [HttpPost("AddUserPhoto")]
        public async Task AddUserPhotoAsync([FromForm] UserPhotoDto userPhotoDto, [FromQuery] int userId)
        {
            await _manager.AddUserPhotoAsync(userPhotoDto, userId);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
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
                _logger.LogError(ex, "An error occurred in the Login method.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(new User
            {
                Id = user.Id,
                Email = user.Email,
                Role = user.Role,
                Level = user.Level,
                OverallPoints = user.OverallPoints,
                Points = user.Points,
                Coins = user.Coins,
                Photo = user.Photo
            });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
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
                _logger.LogError(ex, "An error occurred in the Register method.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(new User
            {
                Id = newUser.Id,
                Email = newUser.Email,
                Role = newUser.Role,
                Level = newUser.Level,
                OverallPoints = newUser.OverallPoints,
                Points = newUser.Points,
                Coins = newUser.Coins,
                Photo = newUser.Photo
            });
        }

        [HttpGet("Logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            try
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                return Ok("Succes");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the Logout method.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPasswordAsync([FromQuery] string email)
        {
            return await _manager.ResetPasswordAsync(email);
        }

        [HttpPatch("ChangePassword")]
        public async Task<IActionResult> ChangePasswordAsync([FromQuery] string login, [FromQuery] string oldPassword, [FromQuery] string newPassword)
        {
            return await _manager.ChangePasswordAsync(login, oldPassword, newPassword);
        }

        [HttpPatch("ChangeBirthday")]
        public async Task<IActionResult> ChangeBirthdayAsync([FromQuery] string login, [FromQuery] DateTime newBirthday)
        {
            return await _manager.ChangeBirthdayAsync(login, newBirthday);
        }

        [HttpGet("GetRandomLogin")]
        public string GetRandomLogin()
        {
            return _manager.RandomLoginGenerator();
        }

        [HttpDelete("DeleteAcc")]
        public async Task DeleteAccAsync([FromQuery] int userId, [FromBody] DeletedAccount deletedAccount)
        {
            await _manager.DeleteAccAsync(userId, deletedAccount);
        }

        [HttpPost("FreezeAcc")]
        public async Task FreezeAccAsync([FromQuery] int userId, [FromQuery] string reason)
        {
            await _manager.FreezeAccAsync(userId, reason);
        }

        [HttpPost("UnfreezeAcc")]
        public async Task UnfreezeAccAsync([FromQuery] int userId)
        {
            await _manager.UnfreezeAccAsync(userId);
        }

        [HttpGet("CheckStatusOfAcc")]
        public async Task<bool> CheckStatusOfAccAsync([FromQuery] int userId)
        {
            return await _manager.CheckStatusOfAccAsync(userId);
        }

        [HttpGet("PasswordsMatching")]
        public async Task<bool> PasswordsMatchingAsync([FromQuery] int userId, [FromQuery] string password)
        {
            return await _manager.PasswordsMatchingAsync(userId, password);
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
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during authentication.");
                Response.StatusCode = StatusCodes.Status500InternalServerError;
            }
        }
    }
}