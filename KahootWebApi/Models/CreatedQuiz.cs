using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class CreatedQuiz
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? CategoryName { get; set; }

        [Required]
        public string? QuizName { get; set; }

        [Required]
        public string? UserName { get; set; }

        [Required]
        public bool IsPrivate { get; set; } 

        public string? QuizCode { get; set; }

        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
