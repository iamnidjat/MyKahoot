using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string? CategoryName { get; set; }

        [Required]
        public string? QuizName { get; set; }

        public int FeedbackScore { get; set; } = 0;

        public string? FeedbackComment { get; set; } = "";
    }
}
