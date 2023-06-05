﻿using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.ViewModels
{
    public class RegisterModel
    {
        [Required]
        public string? UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password")]
        public string? ConfirmPassword { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime? Birthday { get; set; }

        //[Required]
        //[DataType(DataType.Text)]
        //public string? Role { get; set; }
    }
}
