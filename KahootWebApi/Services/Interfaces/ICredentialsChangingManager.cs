namespace KahootWebApi.Services.Interfaces
{
    public interface ICredentialsChangingManager
    {
        Task<HttpResponseMessage> SetNameAsync(string username, string name);
        Task<HttpResponseMessage> SetSurnameAsync(string username, string surname);
        Task<HttpResponseMessage> SetUsernameAsync(string oldUsername, string newUsername);
        Task<HttpResponseMessage> SetMailAsync(string username, string mail);
        Task<HttpResponseMessage> SetBackUpMailAsync(string username, string backUpMail);
        Task<HttpResponseMessage> ChangeUsernameChangingToTrueAsync(int id);
        Task<HttpResponseMessage> ChangeEmailChangingToTrueAsync(int id);
        Task<HttpResponseMessage> ChangeEmailConfirmationChangingToTrueAsync(int id);
    }
}
