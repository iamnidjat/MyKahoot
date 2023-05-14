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

        //[Fact]
        //public async Task ChangePasswordAsyncTest()
        //{

        //}
    }
}