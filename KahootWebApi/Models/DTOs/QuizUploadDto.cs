namespace KahootWebApi.Models.DTOs
{
    public class QuizUploadDto
    {
        public string? QuizType { get; set; }
        public string? QuizName { get; set; }
        public string? TestFormat { get; set; }
        public string? Question { get; set; }
        public IFormFile? Photo { get; set; }
        public IFormFile? Video { get; set; }
        public IFormFile? Audio { get; set; }
        public string? Option1 { get; set; }
        public string? Option2 { get; set; }
        public string? Option3 { get; set; }
        public string? Option4 { get; set; }
        public int Answer { get; set; }
        public int QuestionNumber { get; set; }
        public int TimeToAnswer { get; set; }
        public int Points { get; set; }
    }
}
