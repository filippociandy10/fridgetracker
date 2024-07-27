using System;
using System.Diagnostics;
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
    public class FoodController : Controller
    {
        private readonly ApplicationDbContext _context;

        public FoodController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Food
        public async Task<IActionResult> Index()
        {
            var foods = await _context.Food
                .Include(f => f.FoodTags)
                .ThenInclude(ft => ft.Tag)
                .ToListAsync();

            return View(foods);
        }


        // GET: Food/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Food == null)
            {
                return NotFound();
            }

            var food = await _context.Food
                .Include(f => f.FoodTags)
                .ThenInclude(ft => ft.Tag)
                .FirstOrDefaultAsync(m => m.Id == id);


            if (food == null)
            {
                return NotFound();
            }

            return View(food);
        }

        // GET: Food/Create
        public IActionResult Create()
        {
            ViewBag.Tag = _context.Tag.ToList();
            return View();
        }

        // POST: Food/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Food food, List<int> selectedTagId)
        {
            if (ModelState.IsValid)
            {
                _context.Add(food);
                await _context.SaveChangesAsync();

                // Add the selected tag to the food
                foreach (var tagId in selectedTagId)
                {
                    var foodTag = new FoodTag
                    {
                        FoodId = food.Id,
                        TagId = tagId
                    };
                    _context.FoodTag.Add(foodTag);
                }

                await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }

            ViewBag.Tag = _context.Tag.ToList();
            return View(food);
        }

        // GET: Food/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Food == null)
            {
                return NotFound();
            }

            var food = await _context.Food
                                     .Include(f => f.FoodTags)
                                     .ThenInclude(ft => ft.Tag)
                                     .FirstOrDefaultAsync(m => m.Id == id);
            if (food == null)
            {
                return NotFound();
            }

            ViewBag.Tag = await _context.Tag.ToListAsync();

            return View(food);
        }

        // POST: Food/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Food food, List<int> selectedTagId)
        {
            if (id != food.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    // Fetch the current food from the database
                    var existingFood = await _context.Food
                                                    .Include(f => f.FoodTags)
                                                    .FirstOrDefaultAsync(f => f.Id == id);

                    if (existingFood == null)
                    {
                        return NotFound();
                    }

                    // Update the food properties
                    existingFood.Name = food.Name;
                    existingFood.Quantity = food.Quantity;
                    existingFood.Unit = food.Unit;

                    // Update the tags
                    existingFood.FoodTags.Clear();
                    foreach (var tagId in selectedTagId)
                    {

                        existingFood.FoodTags.Add(new FoodTag { FoodId = id, TagId = tagId });
                    }

                    _context.Update(existingFood);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FoodExists(food.Id))
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
            return View(food);
        }

        // GET: Food/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Food == null)
            {
                return NotFound();
            }

            var food = await _context.Food
                .FirstOrDefaultAsync(m => m.Id == id);
            if (food == null)
            {
                return NotFound();
            }

            return View(food);
        }

        // POST: Food/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Food == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Food'  is null.");
            }
            var food = await _context.Food.FindAsync(id);
            if (food != null)
            {
                _context.Food.Remove(food);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool FoodExists(int id)
        {
          return (_context.Food?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
