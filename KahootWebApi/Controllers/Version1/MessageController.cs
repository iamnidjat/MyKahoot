using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KahootWebApi.Controllers.Version1
{
    [Route("api/v1/Message/")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpPost("SendMessage")]
        public async Task<IActionResult> SendMessageAsync([FromBody] Message message)
        {
            await _messageService.SendMessageAsync(message);

            return Ok();
        }

        [HttpGet("GetMessages")]
        public async Task<IEnumerable<Message>> GetMessagesAsync([FromQuery] string userName)
        {
            return await _messageService.GetMessagesAsync(userName);
        }

        [HttpGet("GetMessage")]
        public async Task<Message> GetMessageAsync([FromQuery] int messageId)
        {
            return await _messageService.GetMessageAsync(messageId);
        }

        [HttpGet("GetMessagesCount")]
        public async Task<int> GetMessagesCountAsync([FromQuery] string userName)
        {
            return await _messageService.GetMessagesCountAsync(userName);
        }

        [HttpGet("IsMessageRead")]
        public async Task<bool> IsMessageReadAsync([FromQuery] int messageId)
        {
            return await _messageService.IsMessageReadAsync(messageId);
        }
    }
}
