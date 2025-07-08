public class Fridge
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = "My Fridge";
    public virtual ApplicationUser User { get; set; } = null!;
    public virtual ICollection<FridgeItem> FridgeItems { get; set; } = new List<FridgeItem>();
    public virtual ICollection<FridgeUser> FridgeUsers { get; set; } = new List<FridgeUser>();
}
