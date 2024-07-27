using System;
namespace fridgetracker.Models
{
    public class FoodTag
    {
        public int FoodId { get; set; }
        public Food Food { get; set; }

        public int TagId { get; set; }
        public Tag Tag { get; set; }

        public FoodTag()
        {
        }
    }
}

