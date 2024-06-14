using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace KahootWebApi.Services.Implementations
{
    public class CredentialsChangingManager : ICredentialsChangingManager
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<ContactManager> _logger;

        public CredentialsChangingManager(KahootDbContext context, ILogger<ContactManager> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<HttpResponseMessage> ChangeUsernameChangingToTrueAsync(int id)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Id == id).FirstAsync();

                if (user != null)
                {
                    user.IsUsernameChanged = true;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    _logger.LogError("User not found");
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the ChangeUsernameChangingToTrueAsync method.");
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
        }

        public async Task<HttpResponseMessage> ChangeEmailChangingToTrueAsync(int id)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Id == id).FirstAsync();

                if (user != null)
                {
                    user.IsEmailChanged = true;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    _logger.LogError("User not found");
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the ChangeEmailChangingToTrueAsync method.");
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
        }

        public async Task<HttpResponseMessage> ChangeEmailConfirmationChangingToTrueAsync(int id)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Id == id).FirstAsync();

                if (user != null)
                {
                    user.IsEmailConfirmed = true;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    _logger.LogError("User not found");
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the ChangeEmailConfirmationChangingToTrueAsync method.");
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
        }

        public async Task<HttpResponseMessage> SetNameAsync(string username, string name)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Username == username).FirstAsync();

                if (user != null)
                {
                    user.Name = name;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    _logger.LogError("User not found");
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the SetNameAsync method.");
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
        }

        public async Task<HttpResponseMessage> SetSurnameAsync(string username, string surname)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Username == username).FirstAsync();

                if (user != null)
                {
                    user.Surname = surname;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    _logger.LogError("User not found");
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the SetSurnameAsync method.");
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
        }

        public async Task<HttpResponseMessage> SetUsernameAsync(string oldUsername, string newUsername)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Username == oldUsername).FirstAsync();

                if (user != null)
                {
                    user.Username = newUsername;

                   // user.DateOfChangingUsername = DateOfChangingUsername;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    _logger.LogError("User not found");
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the SetUsernameAsync method.");
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
        }

        public async Task<HttpResponseMessage> SetMailAsync(string username, string mail)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Username == username).FirstAsync();

                if (user != null)
                {
                    user.Email = mail;

                    user.IsEmailConfirmed = false;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    _logger.LogError("User not found");
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the SetMailAsync method.");
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
        }

        public async Task<HttpResponseMessage> SetBackUpMailAsync(string username, string backUpMail)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Username == username).FirstAsync();

                if (user != null)
                {
                    user.BackUpEmail = backUpMail;

                    await _context.SaveChangesAsync();
                }

                else
                {
                    _logger.LogError("User not found");
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                }

                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
            }
            catch (ArgumentNullException ex)
            {
                _logger.LogError(ex, "An error occurred in the SetBackUpMailAsync method.");
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
        }
    }
}
