using KahootWebApi.Models;
using KahootWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KahootWebApi.Services.Implementations
{
    public class MessageService : IMessageService
    {
        private readonly KahootDbContext _context;
        private readonly ILogger<MessageService> _logger;

        public MessageService(KahootDbContext context, ILogger<MessageService> logger) 
        { 
            _context = context;
            _logger = logger;
        }

        public async Task SendMessageAsync(Message message)
        {
            try
            {
                await _context.Messages.AddAsync(message);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) when (ex is OperationCanceledException or DbUpdateException or DbUpdateConcurrencyException)
            {
                _logger.LogError(ex, "An error occurred in the SendMessageAsync method.");
            }
        }

        public async Task<IEnumerable<Message>> GetMessagesAsync(string userName)
        {
            try
            {
                var messages = await _context.Messages
                                             .AsNoTracking()
                                             .Where(m => m.Receiver == userName)
                                             .ToListAsync();

                if (!messages.Any())
                {
                    _logger.LogWarning($"No messages found for the user {userName}.");
                }

                return messages;
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogError(ex, "The operation was canceled in the GetMessagesAsync method.");
                return Enumerable.Empty<Message>(); // Return an empty collection when the operation is canceled
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the GetMessagesAsync method.");
                return Enumerable.Empty<Message>(); // Return an empty collection in case of other errors
            }
        }

        public async Task<Message> GetMessageAsync(int messageId)
        {
            try
            {
                var message = await _context.Messages.AsNoTracking().FirstOrDefaultAsync(m => m.Id == messageId);
                if (message == null)
                {
                    _logger.LogWarning($"Message with ID {messageId} was not found.");
                }
                message.IsRead = true;
                return message;
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogError(ex, "An operation was canceled in the GetMessageAsync method.");
                return null; 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the GetMessageAsync method.");
                return null; 
            }
        }

        public async Task<int> GetMessagesCountAsync(string userName)
        {
            try
            {
                var messagesCount = await _context.Messages
                                             .AsNoTracking()
                                             .Where(m => m.Receiver == userName && !m.IsRead)
                                             .CountAsync();

                return messagesCount;
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogError(ex, "The operation was canceled in the GetMessagesCountAsync method.");
                return -1;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the GetMessagesCountAsync method.");
                return -1;
            }
        }

        public async Task<bool> IsMessageReadAsync(int messageId)
        {
            try
            {
                var message = await _context.Messages.AsNoTracking().FirstOrDefaultAsync(m => m.Id == messageId);

                return message.IsRead;
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogError(ex, "The operation was canceled in the GetMessagesCountAsync method.");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred in the GetMessagesCountAsync method.");
                return false;
            }
        }
    }
}
