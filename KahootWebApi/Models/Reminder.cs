namespace KahootWebApi.Models
{
    public class Reminder
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public DateTime? WhenToPass { get; set; }

        public int UserId {  get; set; }

        public User? User { get; set; }
    }
}
