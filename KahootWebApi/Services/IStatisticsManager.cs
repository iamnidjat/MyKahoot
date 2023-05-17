using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IStatisticsManager
    {
        QuizStat UploadResultAsync(QuizStat item);
        //Task<QuizStat> UploadResultAsync(QuizStat item);
        Task<IEnumerable<QuizStat>> DownloadResultAsync(int userId);
    }
}
