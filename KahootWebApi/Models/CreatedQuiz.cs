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

        [Required]
        public bool IsVIP { get; set; } = false;    

        public bool AllowedToDownload { get; set; } = false;

        public string? QuizCode { get; set; }

        public int TimesPassed { get; set; } = 0;

        public double AverageFeedbackScore { get; set; } = 0;

        public ICollection<Like>? Likes { get; set; } = new ObservableCollection<Like>();

        public ICollection<Dislike>? Dislikes { get; set; } = new ObservableCollection<Dislike>();

        public ICollection<Comment>? Comments { get; set; } = new ObservableCollection<Comment>();

        [Required]
        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
