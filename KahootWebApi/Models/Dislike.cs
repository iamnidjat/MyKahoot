using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class Dislike
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AuthorId { get; set; }

        public User? Author { get; set; }

        [Required]
        public int QuizId { get; set; }

        public CreatedQuiz? Quiz { get; set; }
    }
}
