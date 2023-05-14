using KahootWebApi.Controllers.v1;
using KahootWebApi.Models;
using KahootWebApi.Services;
using Moq;

namespace WebApiUnitTests
{
    public class StatisticsControllerTests
    {
        private readonly Mock<IStatisticsManager> _mock;

        public StatisticsControllerTests() 
        {
            _mock = new Mock<IStatisticsManager>();
        }

        [Fact]
        public async Task DownloadResultTest()
        {
            //arrange
            var users = GetUsers();
            _mock.Setup(x => x.DownloadResultAsync()).ReturnsAsync(users!);
            var controller = new StatisticsController(_mock.Object);

            //act
            var data = await controller.DownloadResult();

            //assert
            Assert.NotNull(data);
            Assert.Equal(GetUsers().Count(), data.Count());
            Assert.Equal(GetUsers().ToString(), data.ToString());
            Assert.True(users!.Equals(data));
        }

        [Fact]
        public void UploadResultTest()
        {
            //arrange
            var users = GetUsers();
            _mock.Setup(x => x.UploadResultAsync(users![1])).Returns(users![1]);
            var controller = new StatisticsController(_mock.Object);

            //act
            var data = controller.UploadResult(users![1]);

            //assert
            Assert.NotNull(data);
            Assert.Equal(users[1].Id, data.Id);
            Assert.True(users[1].Id == data.Id);
        }

        private List<QuizStat> GetUsers()
        {
            var users = new List<QuizStat>
            {
                new QuizStat
                {
                    Id = 1,
                    QuizName = "Math",
                    Score = 50,
                    UserId = 1
                },
                new QuizStat
                {
                    Id = 2,
                    QuizName = "Programming",
                    Score = 60,
                    UserId = 1
                },
                new QuizStat
                {
                    Id = 3,
                    QuizName = "Logics",
                    Score = 80,
                    UserId = 1
                }
            };

            return users;
        }
    }
}

