using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class MyQuizAnswers
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? CategoryName { get; set; }

        [Required]
        public string? QuizName { get; set; }

        [Required]
        public int QuestionNumber { get; set; }

        [Required]
        public int CorrectAnswer { get; set; }

        [Required]
        public int MyAnswer { get; set; }

        [Required]
        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
