﻿using System.ComponentModel.DataAnnotations;

namespace EmployeeCRUDApp.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Department { get; set; }
        public decimal Salary { get; set; }
        public DateTime StartDate { get; set; }
    }
}
