namespace KahootWebApi.Models
{
    public class UserVirtualClassroom
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public int VirtualClassroomId { get; set; }
        public VirtualClassroom? VirtualClassroom { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
