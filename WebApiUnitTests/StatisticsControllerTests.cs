using KahootWebApi.Controllers.v1;
using KahootWebApi.Models;
using KahootWebApi.Services;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
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

        [Theory]
        [InlineData(1)]
        public async Task DownloadResultByUserIdTest(int userId)
        {
            //arrange
            var stats = GetStats();
            _mock.Setup(x => x.DownloadResultAsync(userId)).ReturnsAsync(stats!);
            var controller = new StatisticsController(_mock.Object);

            //act
            var data = await controller.DownloadResult(userId);

            //assert
            Assert.NotNull(data);
            Assert.Equal(GetStats().Count(), data.Count());
            Assert.Equal(GetStats().ToString(), data.ToString());
            Assert.True(stats!.Equals(data));
        }

        [Theory]
        [InlineData("math")]
        public async Task DownloadResultTest(string quizType)
        {
            //arrange
            var stats = GetStats();
            _mock.Setup(x => x.DownloadResultAsync(quizType)).ReturnsAsync(stats!);
            var controller = new StatisticsController(_mock.Object);

            //act
            var data = await controller.DownloadResult(quizType);

            //assert
            Assert.NotNull(data);
            Assert.Equal(GetStats().Count(), data.Count());
            Assert.Equal(GetStats().ToString(), data.ToString());
            Assert.True(stats!.Equals(data));
        }

        [Fact]
        public void UploadResultTest()
        {
            //arrange
            var stats = GetStats();
            _mock.Setup(x => x.UploadResultAsync(stats![1])).Returns(stats![1]);
            var controller = new StatisticsController(_mock.Object);

            //act
            var data = controller.UploadResult(stats![1]);

            //assert
            Assert.NotNull(data);
            Assert.Equal(stats[1].Id, data.Id);
            Assert.True(stats[1].Id == data.Id);
        }

        private List<QuizStat> GetStats()
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

