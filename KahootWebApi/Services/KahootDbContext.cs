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
        public DbSet<Reminder> Reminders { get; set; }
        public DbSet<ItemToBuy> ItemToBuys { get; set; }
        public DbSet<UserItem> UserItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(p => p.CreatedQuizzes)
                .WithOne(c => c.User)
                .OnDelete(DeleteBehavior.Restrict);

            // modelBuilder.Entity<UserBadge>()
            //.HasKey(ub => new { ub.UserId, ub.BadgeId });

            // modelBuilder.Entity<UserBadge>()
            //     .HasOne(ub => ub.User)
            //     .WithMany(u => u.UserBadges)
            //     .HasForeignKey(ub => ub.UserId);

            // modelBuilder.Entity<UserBadge>()
            //     .HasOne(ub => ub.Badge)
            //     .WithMany(b => b.UserBadges)
            //     .HasForeignKey(ub => ub.BadgeId);

            modelBuilder.Entity<ItemToBuy>().HasData(
                new ItemToBuy { Id = 1, Name = "Pen1", Description = "Pen1", Photo = "/itemPhotos/pen1.png", Price = 1, Quantity = 10 },
                new ItemToBuy { Id = 2, Name = "Pen2", Description = "Pen2", Photo = "/itemPhotos/pen2.jpg", Price = 1, Quantity = 10 }, 
                new ItemToBuy { Id = 3, Name = "Pen3", Description = "Pen3", Photo = "/itemPhotos/pen3.png", Price = 1, Quantity = 10 });
        }
    }
}
