namespace KahootWebApi.Models
{
    public class UserItem
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public ItemToBuy? ItemToBuy { get; set; }
        public int ItemToBuyId { get; set; }
        public Badge? Badge { get; set; }
        public DateTime PurchasedTime { get; set; }
    }
}
