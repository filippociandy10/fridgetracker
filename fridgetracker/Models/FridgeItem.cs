using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace FridgeTracker.Models
{
    public class FridgeItem
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        [Required]
        public DateTime ExpiryDate { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; } = 1;
        [Required]
        public string Unit { get; set; } = "piece(s)";
        [Required]
        public int CategoryId { get; set; }
        public string? StorageLocation { get; set; }
        public virtual Category? Category { get; set; }
        [JsonIgnore]
        public ItemStatus Status =>
            ExpiryDate < DateTime.Now ? ItemStatus.Expired :
            (ExpiryDate - DateTime.Now).TotalDays <= 3 ? ItemStatus.NearExpiry :
            ItemStatus.Good;
        public string StatusText => Status switch
        {
            ItemStatus.Expired => "Expired",
            ItemStatus.NearExpiry => "Expiring Soon",
            ItemStatus.Good => "Good",
            _ => "Unknown"
        };
        public string? Notes { get; set; }
        public int FridgeId { get; set; }
        public virtual Fridge Fridge { get; set; } = null!;
    }
}