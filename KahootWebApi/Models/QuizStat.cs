using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace KahootWebApi.Models
{
    public class QuizStat
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? QuizName { get; set; }

        [Required]
        public int Score { get; set; }

        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
