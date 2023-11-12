using Microsoft.EntityFrameworkCore;
using System.Net;

namespace KahootWebApi.Services
{
    public class CredentialsChangingManager : ICredentialsChangingManager
    {
        private readonly KahootDbContext _context;

        public CredentialsChangingManager(KahootDbContext context)
        {
            _context = context;
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
            catch (ArgumentNullException)
            {
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
            catch (ArgumentNullException)
            {
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
            catch (ArgumentNullException)
            {
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
            catch (ArgumentNullException)
            {
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
            catch (ArgumentNullException)
            {
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
        }

        public async Task<HttpResponseMessage> SetUsernameAsync(string oldUsername, string newUsername, DateTime DateOfChangingUsername)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Username == oldUsername).FirstAsync();

                if (user != null)
                {
                    user.Username = newUsername;

                    user.DateOfChangingUsername = DateOfChangingUsername;

                    await _context.SaveChangesAsync();
                }

                else
                {
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
            catch (ArgumentNullException)
            {
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
            catch (ArgumentNullException)
            {
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
            catch (ArgumentNullException)
            {
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
            }
        }
    }
}
