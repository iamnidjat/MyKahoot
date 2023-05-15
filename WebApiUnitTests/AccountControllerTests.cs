using KahootWebApi.Controllers.v1;
using KahootWebApi.Models;
using KahootWebApi.Services;
using Moq;

namespace WebApiUnitTests
{
    public class AccountControllerTests
    {
        private readonly Mock<IAccountManager> _mock;

        public AccountControllerTests()
        {
            _mock = new Mock<IAccountManager>();
        }

        [Fact]
        public async Task ChangePasswordAsyncTest()
        {
            
        }

        private List<User> GetUsers()
        {
            var users = new List<User>
            {
                new User
                {
                   Id = 1,
                   Username = "User1",
                   Password = "password",
                   Email = "mail1@mail.ru",
                   Birthday = DateTime.Now
                },
                new User
                {
                   Id = 2,
                   Username = "User2",
                   Password = "password",
                   Email = "mail2@mail.ru",
                   Birthday = DateTime.Now
                },
                new User
                {
                   Id = 3,
                   Username = "User3",
                   Password = "password",
                   Email = "mail3@mail.ru",
                   Birthday = DateTime.Now
                }
            };

            return users;
        }
    }
}