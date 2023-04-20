using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.v1
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
