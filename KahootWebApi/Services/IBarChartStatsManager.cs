using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public interface IBarChartStatsManager
    {
        Task<IEnumerable<QuizStat>> DownloadResultAsync(string catType, string quizType, string level);
    }
}
