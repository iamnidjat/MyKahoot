namespace KahootWebApi.Models
{
    public class VCHomework
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public int VirtualClassroomId { get; set; }

        public VirtualClassroom? VirtualClassroom { get; set; }
    }
}
