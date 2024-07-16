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
        public DbSet<MyQuizAnswers> MyQuizAnswers { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Badge> Badges { get; set; }
        public DbSet<UserBadge> UserBadges { get; set; }
        public DbSet<Reminder> Reminders { get; set; }
        public DbSet<VirtualClassroom> VirtualClassrooms { get; set; }
        public DbSet<VCHomework> VCHomeworks { get; set; }
        public DbSet<UserVirtualClassroom> UserVirtualClassrooms { get; set; }
        public DbSet<ItemToBuy> ItemToBuys { get; set; }
        public DbSet<UserItem> UserItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(p => p.CreatedQuizzes)
                .WithOne(c => c.User)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserBadge>()
           .HasKey(ub => new { ub.UserId, ub.BadgeId });

            modelBuilder.Entity<UserBadge>()
                .HasOne(ub => ub.User)
                .WithMany(u => u.UserBadges)
                .HasForeignKey(ub => ub.UserId);

            modelBuilder.Entity<UserBadge>()
                .HasOne(ub => ub.Badge)
                .WithMany(b => b.UserBadges)
                .HasForeignKey(ub => ub.BadgeId);

            // Seed data
            modelBuilder.Entity<Badge>().HasData(
                new Badge { Id = 1, Name = "First Quiz Completed", Description = "Complete your first quiz" },
                new Badge { Id = 2, Name = "10 Quizzes Completed", Description = "Complete 10 quizzes" },
                new Badge { Id = 3, Name = "Quiz Master", Description = "Complete 50 quizzes" },
                new Badge { Id = 4, Name = "Quiz Legend", Description = "Complete 100 quizzes" },
                new Badge { Id = 5, Name = "First Quiz Created", Description = "Create your first quiz" },
                new Badge { Id = 6, Name = "First Private Quiz Created", Description = "Create your first private quiz" },
                new Badge { Id = 7, Name = "10 Quizzes Created", Description = "Create 10 quizzes" },
                new Badge { Id = 8, Name = "Quiz Creating Master", Description = "Create 50 quizzes" },
                new Badge { Id = 9, Name = "Quiz Creating Legend", Description = "Create 100 quizzes" },
                new Badge { Id = 10, Name = "Welcome!", Description = "Registration badge" },
                new Badge { Id = 11, Name = "Email confirmed!", Description = "Email confirmation badge" },
                new Badge { Id = 12, Name = "Top-100", Description = "You are in the top-100 leaderboard" },
                new Badge { Id = 13, Name = "Top-50", Description = "You are in the top-50 leaderboard" },
                new Badge { Id = 14, Name = "Top-10", Description = "You are in the top-10 leaderboard" },
                new Badge { Id = 15, Name = "Leader!", Description = "You are first in the leaderboard" },
                new Badge { Id = 16, Name = "All Badges earned!", Description = "You earned all badges" }
            );
        }
    }
}
