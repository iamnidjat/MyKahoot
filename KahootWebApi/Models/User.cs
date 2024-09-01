using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    [Index("Username", IsUnique = true)]
    [Index("Email", IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Username { get; set; }

        public bool IsUsernameChanged { get; set; } = false;

        public string? Name { get; set; } = "";

        public string? Surname { get; set; } = "";

        public string? Password { get; set; } = "";

        [Required]
        public string? Email { get; set; }

        public bool IsEmailChanged { get; set; } = false;

        public string? BackUpEmail { get; set; } = "";

        public bool IsEmailConfirmed { get; set; } = false;

        public DateTime Birthday { get; set; }

        public string? Photo { get; set; }

        [Required]
        public string? Role { get; set; }

        public string? Provider { get; set; }

        public bool IsFrozen { get; set; } = false;

        public string? FreezingReason { get; set; }

        public bool IsBanned { get; set; } = false;

        public DateTime? BannedDate { get; set; }

        public int OverallPoints { get; set; }

        [Range(1, 100)]
        public int Level { get; set; } = 1;

        public int Points { get; set; } // for level

        public int Coins { get; set; }

        public SocialUser? SocialUser { get; set; }

        public ICollection<QuizStat> Quizzes { get; set; } = new ObservableCollection<QuizStat>();

        public ICollection<CreatedQuiz> CreatedQuizzes { get; set; } = new ObservableCollection<CreatedQuiz>();

        public ICollection<Comment> Comments { get; set; } = new ObservableCollection<Comment>();

        public ICollection<Like> Likes { get; set; } = new ObservableCollection<Like>();

        public ICollection<Dislike> Dislikes { get; set; } = new ObservableCollection<Dislike>();

        public ICollection<MyQuizAnswers> MyQuizAnswers { get; set; } = new ObservableCollection<MyQuizAnswers>();

        public ICollection<Reminder> Reminders { get; set; } = new ObservableCollection<Reminder>();

        public ICollection<UserItem> UserItems { get; set; } = new ObservableCollection<UserItem>();
    }
}
