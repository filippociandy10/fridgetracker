using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using fridgetracker.Data;
using fridgetracker.Models;

namespace fridgetracker.Controllers
{
    public class TagController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TagController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Tag
        public async Task<IActionResult> Index()
        {
              return _context.Tag != null ? 
                          View(await _context.Tag.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Tag'  is null.");
        }

        // GET: Tag/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Tag == null)
            {
                return NotFound();
            }

            var tags = await _context.Tag
                .FirstOrDefaultAsync(m => m.Id == id);
            if (tags == null)
            {
                return NotFound();
            }

            return View(tags);
        }

        // GET: Tag/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Tag/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,TagName")] Tag tags)
        {
            if (ModelState.IsValid)
            {
                _context.Add(tags);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(tags);
        }

        // GET: Tag/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Tag == null)
            {
                return NotFound();
            }

            var tags = await _context.Tag.FindAsync(id);
            if (tags == null)
            {
                return NotFound();
            }
            return View(tags);
        }

        // POST: Tag/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,TagName")] Tag tags)
        {
            if (id != tags.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tags);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TagExists(tags.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(tags);
        }

        // GET: Tag/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Tag == null)
            {
                return NotFound();
            }

            var tags = await _context.Tag
                .FirstOrDefaultAsync(m => m.Id == id);
            if (tags == null)
            {
                return NotFound();
            }

            return View(tags);
        }

        // POST: Tag/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Tag == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Tag'  is null.");
            }
            var tags = await _context.Tag.FindAsync(id);
            if (tags != null)
            {
                _context.Tag.Remove(tags);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TagExists(int id)
        {
          return (_context.Tag?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
