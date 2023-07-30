using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class CreatedQuiz
    {
        [Key]
        public int Id { get; set; }

        public string? QuizName { get; set; }

        public string? CategoryName { get; set; }

        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
