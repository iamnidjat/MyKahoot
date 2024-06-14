using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class SocialUser
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Username { get; set; }

        public string? Name { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Role { get; set; }

        public string? Provider { get; set; }
    }
}
