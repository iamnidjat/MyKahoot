namespace KahootWebApi.Models.DTOs
{
    public class ItemToBuyWithQuantityDto
    {
        public int ItemToBuyId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public string? Photo { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
    }
}
