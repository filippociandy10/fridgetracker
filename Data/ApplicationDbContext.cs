using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using fridgetracker.Models;

namespace fridgetracker.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<fridgetracker.Models.Food> Food { get; set; }
    public DbSet<fridgetracker.Models.Tag> Tag { get; set; }
    public DbSet<FoodTag> FoodTag { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<FoodTag>()
            .HasKey(ft => new { ft.FoodId, ft.TagId });

        modelBuilder.Entity<FoodTag>()
            .HasOne(ft => ft.Food)
            .WithMany(f => f.FoodTags)
            .HasForeignKey(ft => ft.FoodId);

        modelBuilder.Entity<FoodTag>()
            .HasOne(ft => ft.Tag)
            .WithMany(t => t.FoodTags)
            .HasForeignKey(ft => ft.TagId);
    }
}

