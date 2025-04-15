using Microsoft.EntityFrameworkCore;
using FridgeTracker.Models;

namespace FridgeTracker.Data
{
    public class FridgeTrackerDbContext : DbContext
    {
        public FridgeTrackerDbContext(DbContextOptions<FridgeTrackerDbContext> options)
            : base(options)
        {
        }

        public DbSet<FridgeItem> FridgeItems { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<AppSettings> Settings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Relationships
            modelBuilder.Entity<FridgeItem>()
                .HasOne(f => f.Category)
                .WithMany(c => c.FridgeItems)
                .HasForeignKey(f => f.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Default categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Dairy", Description = "Milk, cheese, yogurt" },
                new Category { Id = 2, Name = "Meat", Description = "Beef, chicken, pork" },
                new Category { Id = 3, Name = "Vegetables", Description = "Fresh vegetables" },
                new Category { Id = 4, Name = "Fruits", Description = "Fresh fruits" },
                new Category { Id = 5, Name = "Beverages", Description = "Drinks, juices" },
                new Category { Id = 6, Name = "Leftovers", Description = "Leftover meals" },
                new Category { Id = 7, Name = "Condiments", Description = "Sauces, dressings" },
                new Category { Id = 8, Name = "Other", Description = "Miscellaneous items" }
            );

            // Default settings
            modelBuilder.Entity<AppSettings>().HasData(
                new AppSettings { Id = 1, WarningDays = 3, ShowNotifications = true, DarkMode = false }
            );
        }
    }
}