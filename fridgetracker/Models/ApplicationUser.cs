using Microsoft.AspNetCore.Identity;

namespace FridgeTracker.Models.Auth
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public virtual ICollection<Fridge> Fridges { get; set; } = new List<Fridge>();
    }
}