using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/Badge/")]
    [ApiController]
    public class BadgeController : ControllerBase
    {
        private readonly IBadgeManager _badgeManager;

        public BadgeController(IBadgeManager badgeManager) 
        {
            _badgeManager = badgeManager;
        }


    }
}
