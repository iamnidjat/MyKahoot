using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KahootWebApi.Models
{
    public class CreatedQuizStats
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? CategoryName { get; set; }

        [Required]
        public string? QuizName { get; set; }

        [Required]
        public int TimesPassed { get; set; }

        [Required]
        public double AverageFeedbackScore { get; set; }

        public ICollection<Like>? Likes { get; set; } = new ObservableCollection<Like>();

        public ICollection<Dislike>? Dislikes { get; set; } = new ObservableCollection<Dislike>();

        public ICollection<Comment>? Comments { get; set; } = new List<Comment>();

        [ForeignKey("CreatedQuizId")]
        public CreatedQuiz? CreatedQuiz { get; set; }

        public int CreatedQuizId { get; set; }
    }
}
