using System.ComponentModel.DataAnnotations;

namespace FridgeTracker.Models
{
    public class AppSettings
    {
        public int Id { get; set; }

        [Range(1, 30)]
        public int WarningDays { get; set; } = 3;

        public bool ShowNotifications { get; set; } = true;

        public bool DarkMode { get; set; } = false;
    }
}