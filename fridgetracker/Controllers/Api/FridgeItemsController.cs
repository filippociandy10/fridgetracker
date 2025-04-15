using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FridgeTracker.Data;
using FridgeTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FridgeTracker.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class FridgeItemsController : ControllerBase
    {
        private readonly FridgeTrackerDbContext _context;

        public FridgeItemsController(FridgeTrackerDbContext context)
        {
            _context = context;
        }

        // GET: api/FridgeItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FridgeItem>>> GetFridgeItems()
        {
            return await _context.FridgeItems
                .Include(f => f.Category)
                .OrderBy(f => f.ExpiryDate)
                .ToListAsync();
        }

        // GET: api/FridgeItems/id
        [HttpGet("{id}")]
        public async Task<ActionResult<FridgeItem>> GetFridgeItem(int id)
        {
            var fridgeItem = await _context.FridgeItems
                .Include(f => f.Category)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (fridgeItem == null)
            {
                return NotFound();
            }

            return fridgeItem;
        }

        // GET: api/FridgeItems/expiring
        [HttpGet("expiring")]
        public async Task<ActionResult<IEnumerable<FridgeItem>>> GetExpiringItems()
        {
            var settings = await _context.Settings.FirstOrDefaultAsync() ?? new AppSettings();
            var warningDate = DateTime.Now.AddDays(settings.WarningDays);

            return await _context.FridgeItems
                .Include(f => f.Category)
                .Where(f => f.ExpiryDate >= DateTime.Now && f.ExpiryDate <= warningDate)
                .OrderBy(f => f.ExpiryDate)
                .ToListAsync();
        }

        // POST: api/FridgeItems
        [HttpPost]
        public async Task<ActionResult<FridgeItem>> PostFridgeItem(FridgeItem fridgeItem)
        {
            fridgeItem.DateAdded = DateTime.Now;
            _context.FridgeItems.Add(fridgeItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFridgeItem), new { id = fridgeItem.Id }, fridgeItem);
        }

        // PUT: api/FridgeItems/id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFridgeItem(int id, FridgeItem fridgeItem)
        {
            if (id != fridgeItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(fridgeItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FridgeItemExists(id))
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

        // DELETE: api/FridgeItems/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFridgeItem(int id)
        {
            var fridgeItem = await _context.FridgeItems.FindAsync(id);
            if (fridgeItem == null)
            {
                return NotFound();
            }

            _context.FridgeItems.Remove(fridgeItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FridgeItemExists(int id)
        {
            return _context.FridgeItems.Any(e => e.Id == id);
        }
    }
}