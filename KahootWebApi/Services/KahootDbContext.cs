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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Quiz>().HasData(
            //    new Quiz
            //    {
            //        
            //    }
            //);
        }
    }
}
