using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Content { get; set; }

        [Required]
        public DateTime Date { get; set; }

        //[Required]
        //public string? AuthorName { get; set; }

        [Required]
        public int AuthorId { get; set; }

        public User? Author { get; set; }

        [Required]
        public int CreatedQuizId { get; set; }

        public CreatedQuiz? CreatedQuiz { get; set; }
    }
}
