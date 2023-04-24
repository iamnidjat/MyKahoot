using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IStatisticsManager
    {
        Task UploadResultAsync(QuizStat item);
        Task<IEnumerable<QuizStat>> DownloadResultAsync();
    }
}
