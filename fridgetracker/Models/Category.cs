using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FridgeTracker.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        // Navigation property
        [JsonIgnore]
        public virtual ICollection<FridgeItem> FridgeItems { get; set; } = new List<FridgeItem>();
    }
}