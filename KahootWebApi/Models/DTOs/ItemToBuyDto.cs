﻿namespace KahootWebApi.Models.DTOs
{
    public class ItemToBuyDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public int Price { get; set; }

        public int Quantity { get; set; }

        public IFormFile? Photo { get; set; }
    }
}
