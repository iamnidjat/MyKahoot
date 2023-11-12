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
    }
}
