﻿using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class DeletedAccount
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Reason { get; set; }
    }
}
