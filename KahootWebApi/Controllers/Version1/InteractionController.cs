using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/Interaction/")]
    [ApiController]
    public class InteractionController : ControllerBase
    {
        private readonly IInteractionService _interactionService;
        private readonly ILogger<InteractionController> _logger;

        public InteractionController(IInteractionService interactionService,
            ILogger<InteractionController> logger)
        {
            _interactionService = interactionService;
            _logger = logger;
        }

        [HttpPost("AddComment")]
        public async Task AddCommentAsync(Comment comment)
        {
            await _interactionService.AddCommentAsync(comment);
        }

        [HttpPost("AddLike")]
        public async Task AddLikeAsync(Like like)
        {
            await _interactionService.AddLikeAsync(like);
        }
    }
}
