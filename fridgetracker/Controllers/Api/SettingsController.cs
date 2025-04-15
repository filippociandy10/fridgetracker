using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FridgeTracker.Data;
using FridgeTracker.Models;
using System.Threading.Tasks;

namespace FridgeTracker.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly FridgeTrackerDbContext _context;

        public SettingsController(FridgeTrackerDbContext context)
        {
            _context = context;
        }

        // GET: api/Settings
        [HttpGet]
        public async Task<ActionResult<AppSettings>> GetSettings()
        {
            var settings = await _context.Settings.FirstOrDefaultAsync();

            if (settings == null)
            {
                settings = new AppSettings
                {
                    WarningDays = 3,
                    ShowNotifications = true,
                    DarkMode = false
                };

                _context.Settings.Add(settings);
                await _context.SaveChangesAsync();
            }

            return settings;
        }

        // PUT: api/Settings
        [HttpPut]
        public async Task<IActionResult> PutSettings(AppSettings settings)
        {
            _context.Entry(settings).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SettingsExists(settings.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool SettingsExists(int id)
        {
            return _context.Settings.Any(e => e.Id == id);
        }
    }
}