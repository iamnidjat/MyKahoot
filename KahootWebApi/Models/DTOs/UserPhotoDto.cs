namespace KahootWebApi.Models.DTOs
{
    public class UserPhotoDto
    {
        public int Id { get; set; }

        public IFormFile? Photo { get; set; }
    }
}
