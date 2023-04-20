using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.v1
{
    public class StatisticsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
