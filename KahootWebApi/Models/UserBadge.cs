﻿namespace KahootWebApi.Models
{
    public class UserBadge
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int BadgeId { get; set; }
        public Badge? Badge { get; set; }
        public DateTime EarnedDate { get; set; }
    }
}
