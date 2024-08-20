using EmployeeCRUDApp.Context;
using EmployeeCRUDApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeCRUDApp.Controllers
{
    public class EmployeeController : Controller
    {

        private readonly EmployeeContext employeeContext;
        public EmployeeController(EmployeeContext employeeContext)
        {
            this.employeeContext = employeeContext;
        }


        public IActionResult Index()
        {
            return View();
        }
        public JsonResult EmployeeList()
        {
            var result = employeeContext.Employees.ToList();
            return new JsonResult(result);
        }

        [HttpPost]
        public JsonResult AddNewEmployee([FromBody] Employee employee)
        {

            var emp = new Employee()
            {
                Name = employee.Name,
                Gender = employee.Gender,
                Department = employee.Department,
                Salary = employee.Salary,
                StartDate = employee.StartDate,
            };


            employeeContext.Employees.Add(emp);
            employeeContext.SaveChanges();
            return new JsonResult("Data is Added");

        }

        [HttpPost]
        public JsonResult DeleteEmployee(int id)
        {
            var user = employeeContext.Employees.FirstOrDefault(x => x.Id == id);

            if (user != null)
            {
                employeeContext.Employees.Remove(user);
                employeeContext.SaveChanges();
                return new JsonResult("User Deleted Successfully");
            }
            return new JsonResult("User is not deleted");
        }

        [HttpPost]
        [Route("Employee/EditEmployee/{id}")]

        public JsonResult EditEmployee(int id, [FromBody]Employee employee)
        {
            var emp = employeeContext.Employees.FirstOrDefault(x => x.Id == id);
            if (employee != null)
            {
                emp.Name = employee.Name;
                emp.Gender = employee.Gender;
                emp.Department = employee.Department;
                emp.Salary = employee.Salary;
                emp.StartDate = employee.StartDate;

                employeeContext.SaveChanges();

                return new JsonResult("Employee updated successfully");

            }
            else
            {
                return new JsonResult("Employee not found");

            }
        }
    }
}
