using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace KahootWebApi.Models
{
    public class ItemToBuy
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public int Price { get ; set; }

        [Required]
        public int Quantity { get ; set; }

        [Required]
        public string? Photo { get; set; }

        public bool IsDisabled { get; set; } = false;

        public ICollection<UserItem> UserItems { get; set; } = new ObservableCollection<UserItem>();
    }
}
