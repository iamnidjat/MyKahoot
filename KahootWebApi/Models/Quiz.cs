﻿using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class Quiz
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Question { get; set; }

        public string? ImageName { get; set; }

        [Required]
        public string? Option1 { get; set; }

        [Required]
        public string? Option2 { get; set; }

        [Required]
        public string? Option3 { get; set; }

        [Required]
        public string? Option4 { get; set; }

        [Required]
        public int Answer { get; set; }

        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
