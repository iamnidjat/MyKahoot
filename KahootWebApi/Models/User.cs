using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;
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

        public bool IsUsernameChanged { get; set; } = false;

        public string? Name { get; set; } = "";

        public string? Surname { get; set; } = "";

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? Email { get; set; }

        public bool IsEmailChanged { get; set; } = false;

        public string? BackUpEmail { get; set; } = "";

        public bool IsEmailConfirmed { get; set; } = false;

        [Required]
        public DateTime? Birthday { get; set; }

        [Required]
        public string? Role { get; set; }

        public ICollection<QuizStat> Quizzes { get; set; } = new ObservableCollection<QuizStat>();

        public ICollection<Quiz> Questions { get; set; } = new ObservableCollection<Quiz>();

        public ICollection<CreatedQuiz> CreatedQuizzes { get; set; } = new ObservableCollection<CreatedQuiz>();
    }
}
