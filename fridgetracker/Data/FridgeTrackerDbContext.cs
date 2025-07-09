using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using FridgeTracker.Models;
using FridgeTracker.Models.Auth;

namespace FridgeTracker.Data
{
    public class FridgeTrackerDbContext : IdentityDbContext<ApplicationUser>
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
            // This calls the base IdentityDbContext OnModelCreating which sets up the Identity tables
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

            // Optional: Customize the Identity tables names if desired
            // modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            // modelBuilder.Entity<IdentityRole>().ToTable("Roles");

            // Add any additional configurations for the Identity tables
            modelBuilder.Entity<ApplicationUser>()
                .Property(u => u.FirstName)
                .HasMaxLength(50);

            modelBuilder.Entity<ApplicationUser>()
                .Property(u => u.LastName)
                .HasMaxLength(50);
            modelBuilder.Entity<FridgeUser>()
                .HasKey(fu => new { fu.FridgeId, fu.UserId });

            modelBuilder.Entity<FridgeUser>()
                .HasOne(fu => fu.Fridge)
                .WithMany(f => f.FridgeUsers)
                .HasForeignKey(fu => fu.FridgeId);

            modelBuilder.Entity<FridgeUser>()
                .HasOne(fu => fu.User)
                .WithMany(u => u.FridgeUsers)
                .HasForeignKey(fu => fu.UserId);
                
            modelBuilder.Entity<FridgeItem>()
                .HasOne(fi => fi.Fridge)
                .WithMany(f => f.FridgeItems)
                .HasForeignKey(fi => fi.FridgeId)
                .OnDelete(DeleteBehavior.Cascade); 
        }
    }
}