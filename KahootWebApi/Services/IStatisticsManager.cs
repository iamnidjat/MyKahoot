using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IStatisticsManager
    {
        //QuizStat UploadResultAsync(QuizStat item);
        //Task<QuizStat> UploadResultAsync(QuizStat item);
        Task UploadResultAsync(QuizStat item);
        Task<IEnumerable<QuizStat>> DownloadResultAsync(int userId, string catType, string quizType, string level);
        Task<IEnumerable<QuizStat>> DownloadResultAsync(string catType, string quizType, string level);
    }
}
