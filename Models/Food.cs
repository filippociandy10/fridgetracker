using System;
using System.ComponentModel.DataAnnotations;
using Azure;

namespace fridgetracker.Models
{
    public class Food
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Unit { get; set; }

        public ICollection<FoodTag> FoodTags { get; set; } = new List<FoodTag>();

        public string FormattedTags
        {
            get
            {
                return FoodTags == null || !FoodTags.Any()
                    ? "No tags assigned"
                    : string.Join(", ", FoodTags.Select(ft => ft.Tag.TagName));
            }
        }

        public Food()
        {
        }
    }
}

