using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IBarChartStatsManager
    {
        Task<IEnumerable<QuizStat>> DownloadResultAsync(string quizType);
    }
}
