using System.Collections.ObjectModel;

namespace KahootWebApi.Models
{
    public class VirtualClassroom
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public ICollection<VCHomework> VCHomeworks { get; set; } = new ObservableCollection<VCHomework>();

        public ICollection<UserVirtualClassroom> UserVirtualClassrooms { get; set; } = new ObservableCollection<UserVirtualClassroom>();
    }
}
