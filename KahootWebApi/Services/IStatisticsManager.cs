using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IStatisticsManager
    {
        Task<HttpResponseMessage> UploadResultAsync(QuizStat item);
        Task<IEnumerable<QuizStat>> DownloadResultAsync();
    }
}
