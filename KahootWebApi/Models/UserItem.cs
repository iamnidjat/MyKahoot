namespace KahootWebApi.Models
{
    public class UserItem
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public ItemToBuy? ItemToBuy { get; set; }
        public int ItemToBuyId { get; set; }
        public int Quantity { get; set; }
        public DateTime PurchasedTime { get; set; }
        public string? Address { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
    }
}
