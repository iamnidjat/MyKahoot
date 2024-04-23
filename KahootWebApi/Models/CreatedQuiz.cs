using System.Collections.ObjectModel;
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

        //[Required]
        //public int TimesPassed { get; set; }

        //[Required]
        //public float AverageFeedbackScore { get; set; }

        public ICollection<Like>? Likes { get; set; } = new ObservableCollection<Like>();

        public ICollection<Comment>? Comments { get; set; } = new List<Comment>();

        [Required]
        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
