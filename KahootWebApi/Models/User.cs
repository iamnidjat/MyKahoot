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

        public DateTime? DateOfChangingUsername { get; set; }

        public int DeadlineForChangingName { get; set; }

        public string? Name { get; set; } = "";

        public string? Surname { get; set; } = "";

        public string? Password { get; set; } = "";

        [Required]
        public string? Email { get; set; }

        public bool IsEmailChanged { get; set; } = false;

        public string? BackUpEmail { get; set; } = "";

        public bool IsEmailConfirmed { get; set; } = false;

        public DateTime Birthday { get; set; }

        [Required]
        public string? Role { get; set; }

        public string? Provider { get; set; }

        public string? PhotoURL { get; set; }

        public bool IsFrozen { get; set; } = false;

        public string? FreezingReason { get; set; }

        //public DateTime? DateOfFreezing { get; set; }

        //public int? FreezingDeadline { get; set; }

        public ICollection<QuizStat> Quizzes { get; set; } = new ObservableCollection<QuizStat>();

        public ICollection<CreatedQuiz> CreatedQuizzes { get; set; } = new ObservableCollection<CreatedQuiz>();
    }
}
