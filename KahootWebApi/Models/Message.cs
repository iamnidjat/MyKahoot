using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Title { get; set; }

        [Required]
        public string? Body { get; set; }

        [Required]
        public DateTime? CreatedDate { get; set; }

        [Required]
        public string? Sender { get; set; }

        [Required]
        public string? Receiver { get; set; }

        public bool IsRead { get; set; }
    }
}
