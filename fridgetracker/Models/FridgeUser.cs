using FridgeTracker.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;

namespace FridgeTracker.Models
{
    public class FridgeUser
    {
        public int FridgeId { get; set; }
        public string UserId { get; set; } = string.Empty;

        public virtual Fridge Fridge { get; set; } = null!;
        public virtual ApplicationUser User { get; set; } = null!;

        public FridgeUserRole Role { get; set; } = FridgeUserRole.Member;
    }

    public enum FridgeUserRole
    {
        Owner,
        Member,
        Viewer
    }
}
