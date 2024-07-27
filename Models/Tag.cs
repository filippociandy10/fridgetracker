using System;
namespace fridgetracker.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string TagName { get; set; }
        public ICollection<FoodTag> FoodTags { get; set; } = new List<FoodTag>();
        public Tag()
        {
        }
    }
}

