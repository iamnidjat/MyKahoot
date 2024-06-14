using KahootWebApi.Models;

namespace KahootWebApi.Services.Interfaces
{
    public interface IBarChartStatsManager
    {
        Task<IEnumerable<QuizStat>> DownloadResultAsync(string catType, string quizType, string level);
    }
}
