using KahootWebApi.Models;

namespace KahootWebApi.Services.Interfaces
{
    public interface IStatisticsManager
    {
        Task<IEnumerable<QuizStat>> DownloadResultAsync(int userId, string catType, string quizType, string level);
        Task<IEnumerable<QuizStat>> DownloadResultAsync(string catType, string quizType, string level);
        Task<IEnumerable<QuizStat>> DownloadTopResultAsync(int userId);
        Task<IEnumerable<User>> GetLeaderBoardUsersAsync();
        Task UploadResultAsync(QuizStat item);
    }
}
