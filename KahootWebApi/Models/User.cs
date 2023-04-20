using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    [Index("Username", IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public DateTime? Birthday { get; set; }
    }
}
