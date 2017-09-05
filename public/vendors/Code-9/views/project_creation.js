/**
 * Created by Nicaedin on 2017/07/24.
 */

$(document).ready(function() {
    var globEmployees = null;
    $("#employeeTable").empty();

    $('#holder').hide();
    $('#empTableHide').hide();

    $('#assignEmployees').on('click', function (e) {
        var num_employees=($('#range_31').val()).split(";");
        e.preventDefault(); // disable the default form submit event

        $('#demo-form').hide();
        $('#holder').show();
        $.get("test_algorithm",
            {
                num_empl: parseInt(num_employees[1]),
                skills: [$('#tags_1').val()],
                duration: 2,//either to calculation to get number in days or put end date
                budget: $('#budget').val()
            },
            function test(data, status)
            {
                setTimeout(function ()
                {
                    $('#demo-form').show();
                    $('#holder').hide();
                }, 4500);

                $("#employeeTable").empty();
                $('#empTableHide').show();

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
                        "<input type='checkbox' id='check-all' class='flat'>"+
                    "<th>"+
                    "<th>Name</th>"+
                    "<th>Surname</th>"+
                    "<th>Position</th>"+
                    "<th>Employment Length</th>"+
                    "<th>Projects Completed</th>"+
                    "</tr>"+
                    "</thead>"+
                    "<tbody id='emptBody'></tbody></table>"+
                "<button id='removeEmployee' type='button' class='btn docs-tooltip btn-danger btn-round' data-toggle='tooltip' title='Remove selected employee/employees from project'>Remove Selection</button>");

                globEmployees = data;

                $.each(data,function(key,value){
                    $("#emptBody").append(
                        "<tr>"+
                            "<td>"+
                                "<th><input type='checkbox' id='check-all' class='flat'></th>"+
                            "</td>"+
                            "<td>"+value.name+"</td>"+
                            "<td>"+value.surname+"</td>"+
                            "<td>"+value.position+"</td>"+
                            "<td>"+value.employment_length+"</td>"+
                            "<td>"+value.past_projects+"</td>"+
                        "</tr>");
                });
            });
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
        ///e.preventDefault(); // disable the default form submit event
       // window.alert("Employees not assigned");
        $("#demo-form").submit(function(e){
           e.preventDefault();
        if(globEmployees === null){

            window.alert("Employees not assigned");

        }else {
            var num_employees=($('#range_31').val()).split(";");

            $.get("store_emp", {
                    num_empl:num_employees[1],
                    duration: 2,
                    budget: $('#budget').val(),
                    emplArr: JSON.stringify(globEmployees)
                }, function (data, status) {

                });
            this.submit();
        }
    });
    });
});
