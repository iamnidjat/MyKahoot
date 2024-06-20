using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class QuizStat
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? CategoryName { get; set; }

        [Required]
        public string? QuizName { get; set; }

        [Required]
        public int Score { get; set; }

        [Required]
        public string? UserName { get; set; }

        [Required]
        public DateTime PassedDate { get; set; }

        public bool IsVisible { get; set; } = true;

        [Required]
        public string? Level { get; set; }

        [Required]
        public float AverageResponseTime { get; set; }

        [Required]
        public int CorrectAnswersCount { get; set; }

        [Required]
        public int WrongAnswersCount { get; set; }

        [Required]
        public int SkippedQuestionsCount { get; set; }

        public bool Flag { get; set; } = false;

        [Required]
        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
