namespace KahootWebApi.Models.DTOs
{
    public record CommentDto(int Id, string? Content, DateTime? Date, int AuthorId, string? AuthorName);
}
