using KahootWebApi.Models;

namespace KahootWebApi.Services.Interfaces
{
    public interface IMessageService
    {
        Task SendMessageAsync(Message message);
        Task<IEnumerable<Message>> GetMessagesAsync(string userName);
        Task<Message> GetMessageAsync(int messageId);
        Task<int> GetMessagesCountAsync(string userName);
        Task<bool> IsMessageReadAsync(int messageId);
    }
}
