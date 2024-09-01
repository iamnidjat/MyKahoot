using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class Reminder
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? CatName { get; set; }

        [Required]
        public string? TestMode { get; set; }

        [Required]
        public DateTime? WhenToPass { get; set; }

        [Required]
        public int UserId {  get; set; }

        public User? User { get; set; }
    }
}
