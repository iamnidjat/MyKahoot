﻿using System.Collections.ObjectModel;

namespace KahootWebApi.Models
{
    public class Badge
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<UserBadge> UserBadges { get; set; } = new ObservableCollection<UserBadge>();
    }
}
