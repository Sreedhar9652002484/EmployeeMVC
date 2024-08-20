
    $(document).ready(function () {
/*        alert("Ready"); 

*/        // Call ShowEmployees when the document is ready
        ShowEmployees();
    });

    function ShowEmployees() {
        $.ajax({
            url: 'Employee/EmployeeList', 
            type: 'GET', 
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (result, status, xhr) {
                var object = '';
                $.each(result, function (index, item) {
                    object += '<tr>';
                    object += '<td >' + item.id + '</td>';
                    object += '<td>' + item.name + '</td>';
                    object += '<td>' + item.gender + '</td>';
                    object += '<td>' + item.department + '</td>';
                    object += '<td>' + item.salary + '</td>';
                    object += '<td>' + item.startDate + '</td>';
                    object += '<td><button type="button" class="btn btn-sm btn-outline-success" data-bs-toggle="modal" data-bs-target="#editEmployeeModal" onclick="ConfirmEdit(\'' + item.id + '\',\'' + item.name + '\', \'' + item.gender + '\', \'' + item.department + '\', ' + item.salary + ', \'' + item.startDate + '\')">Edit</button> || <button type="button" class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal" onclick="ConfirmDelete(' + item.id + ')">Delete</button></td>';
                    object += '</tr>';
                });

                // Append the generated rows to the table body with id="table-data"
                $('#table-data').html(object);
            },
            error: function () {
                alert("Data can't be retrieved");
            }
        });
    }


function AddEmployee() {
    var objData = {
       Name :  $('#employeeName').val(),
       Gender :  $('#employeeGender').val(),
        Department: $('#employeeDepartment').val(),
        Salary : $('#employeeSalary').val(),
        StartDate: $('#employeeStartDate').val()
    };
    console.log(objData);
    $.ajax({
        url: 'Employee/AddNewEmployee',
        type: 'POST',
        data: JSON.stringify(objData), // Convert data to JSON string
        contentType: 'application/json;charset=utf-8', // Correct content type
        dataType: 'json',
        success: function (result, status, xhr) {
            alert("Data Added Successfully")
            $('#addEmployeeModal').modal('hide'); // Hide modal on success
            ShowEmployees(); // Refresh employee list
        },
        error: function () {
            alert("Data is not Added");
        }

    });
}

function ConfirmEdit(id,name, gender, department, salary, startDate) {
    $("#editEmployeeId").val(id);
    $('#editEmployeeName').val(name);
    $('#editEmployeeGender').val(gender);
    $('#editEmployeeDepartment').val(department);
    $('#editEmployeeSalary').val(salary);
    // Format the date to YYYY-MM-DD
    var formattedDate = new Date(startDate).toISOString().split('T')[0];
    $('#editEmployeeStartDate').val(formattedDate);

}


function EditEmployee() {

    var id = $("#editEmployeeId").val();
    var objData = {
        id:id,
        Name: $('#editEmployeeName').val(),
        Gender: $('#editEmployeeGender').val(),
        Department: $('#editEmployeeDepartment').val(),
        Salary: $('#editEmployeeSalary').val(),
        StartDate: $('#editEmployeeStartDate').val()
    }
    alert(id);
    $.ajax({
        url: '/Employee/EditEmployee/' + id, // Append id to URL

        type: 'Post',
        data: JSON.stringify(objData),
        contentType: 'application/json;charset=utf-8', // Correct content type
        dataType: 'json',
        success: function (result, status, xhr) {
            alert("Data Updated Successfully")
            $('#editEmployeeModal').modal('hide'); // Hide modal on success
            ShowEmployees(); // Refresh employee list
        },
        error: function () {
            alert("Data is not Updated");
        }

    })
}



function ConfirmDelete(id) {
    $('#newdeleteEmployeeId').val(id);

}

function DeleteEmployee() {
    const id = $('#newdeleteEmployeeId').val();

    console.log(id);
    $.ajax({
        url: '/Employee/DeleteEmployee',
        type: 'Post',
        data: { id: id },
        //contentType: 'application/json',
        //contentType: 'application/json;charset=utf-8',
        //dataType: 'json',
        success: function (response) {
            alert("employee details deleted successfully")
            console.log(response)
            $('#deleteEmployeeModal').modal('hide'); // Hide modal on success
            ShowEmployees(); // Refresh employee list

        },
        error: function (xhr, status, error) {
            console.log("failed to get products: " + xhr.responseText);
        },
    });
}

