using Microsoft.EntityFrameworkCore;
using KahootWebApi.Models;

namespace KahootWebApi.Services
{
    public class KahootDbContext : DbContext
    {
        public KahootDbContext(DbContextOptions<KahootDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<QuizStat> Quizzes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Quiz> Questions { get; set; }
        public DbSet<CreatedQuiz> CreatedQuizzes { get; set; }
        public DbSet<DeletedAccount> DeletedAccounts { get; set; }
        public DbSet<SocialUser> SocialUsers { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Dislike> Dislikes { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(p => p.CreatedQuizzes)
                .WithOne(c => c.User)
                .OnDelete(DeleteBehavior.Restrict); // or DeleteBehavior.SetNull, DeleteBehavior.Cascade
        }
    }
}
