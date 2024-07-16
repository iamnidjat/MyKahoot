using System.Collections.ObjectModel;

namespace KahootWebApi.Models
{
    public class ItemToBuy
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public int Price { get ; set; }

        public int Quantiy { get ; set; }

        public string? Photo { get; set; }

        public ICollection<UserItem> UserItems { get; set; } = new ObservableCollection<UserItem>();
    }
}
