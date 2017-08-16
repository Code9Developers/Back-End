/**
 * Created by Nicaedin on 2017/07/24.
 */

$(document).ready(function() {
    var globEmployees = null;
    <!--This is where we add our own functions-->
    // <!--Loading the table for the projects page but I might change the way this works later on-->
    $('#assignEmployees').on('click', function (e) {
        e.preventDefault(); // disable the default form submit event
        $.get("test_algorithm",
            {
                num_empl: $('#numemp').val(),
                skills: ["test", "test", "test"],
                duration: 2,
                budget: $('#budget').val()
            },function(data, status){
                //Sets up the table dynamically
                $("#employeeTable").empty();
                $("#employeeTable").append("<div class='x_title'>"+
                    " <h2>Allocated Employees</h2>"+
                    "<ul class='nav navbar-right panel_toolbox'>"+
                    "<li style='float: right'><a class='collapse-link'><i class='fa fa-chevron-up'></i></a></li>"+
                    "</ul>"+
                    "<div class='clearfix'></div>"+
                    "</div>"+
                    "<div class='x_content'>"+
                    "<p class='text-muted font-13 m-b-30'>"+
                    "<p>"+
                    "<table id='datatable-checkbox' class='table table-striped table-bordered bulk_action' >"+
                    "<thead>"+
                    "<tr>"+
                    "<th>"+
                    "<th><input type='checkbox' id='check-all' class='flat'></th>"+
                    "<th>"+
                    "<th>Name</th>"+
                    "<th>Surname</th>"+
                    "<th>Position</th>"+
                    "<th>Employment Length</th>"+
                    "<th>Projects Completed</th>"+
                    "</tr>"+
                    "</thead>"+
                    "<tbody id='emptBody'></tbody></table>"+
                    " <button id='approveEmployee' style='float: right' type='button' class='btn-round btn-dark docs-tooltip' data-toggle='tooltip' title='Approve generated employees'>Approve Selection</button>"+
                    "<button id='removeEmployee' style='float: left' type='button' class='btn-round btn-danger docs-tooltip' data-toggle='tooltip' title='Remove selected employee/employees from project'>Remove Selection</button>");

                //Store employees in global variable
                globEmployees = data;
                //Loops through the JSON string and produces table
                $.each(data,function(key,value){
                    // console.log(value.name);
                    //  window.alert(data);
                    $("#emptBody").append("<tr>"+
                        "<td>"+
                        "<td><th><input type='checkbox' id='check-all' class='flat'></th>"+
                        "</td>"+
                        "<td>"+value.name+"</td>"+
                        "<td>"+value.surname+"</td>"+
                        "<td>"+value.position+"</td>"+
                        "<td>"+value.employment_length+"</td>"+
                        "<td>"+JSON.parse(value.past_projects)+"</td>"+
                        "</tr>");
                });
                // console.log(data);
            });
        //window.alert("Employees Assigned");
    });

    $('#approveEmployee').on('click', function (e) {
        e.preventDefault(); // disable the default form submit event
        window.alert("Employee Improved");

    });

    $('#removeEmployee').on('click', function (e) {
        e.preventDefault(); // disable the default form submit event
        window.alert("Employee Removed");

    });

    $('#createProjectbtn').on('click', function (e) {
        //.preventDefault(); // disable the default form submit event
       // window.alert("Employees not assigned");
        if(globEmployees == null){

            window.alert("Employees not assigned");
            $("#demo-form").submit(function(e){
                e.preventDefault();
            });
        }else {
            window.alert(JSON.stringify(globEmployees));
            $.get("store_emp", {
                    num_empl: $('#numemp').val(),
                    duration: 2,
                    budget: $('#budget').val(),
                    emplArr: JSON.stringify(globEmployees)
                }, function (data, status) {
                     //e.submit();
                    $("#demo-form").submit();
                }
            )
        }
    });
});
