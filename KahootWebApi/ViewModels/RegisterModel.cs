using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.ViewModels
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Не указан UserName")]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "Не указан пароль")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        public string? ConfirmPassword { get; set; }
    }
}
