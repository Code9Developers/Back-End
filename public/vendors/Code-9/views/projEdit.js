/**
 * Created by Nicaedin on 08/17/2017.
 */
$(document).ready(function() {

    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    $.get("data_project_edit", {id:$.urlParam('id')},
        function (data, status) {

            $("#CurrentDeadline").val(data.project_end_date.substr(0,10));
    });

    $.get("find_project_users", {id:$.urlParam('id')},
        function (data, status) {
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
                "<button id='removeEmployee' type='button' class='btn docs-tooltip btn-danger btn-round' data-toggle='tooltip' title='Remove selected employee/employees from project'>Remove Selection</button>");

            globEmployees = data;
            $.each(data,function(key,value){
                $("#emptBody").append("<tr>"+
                    "<td>"+
                    "<td><th><input type='checkbox' id='check-all' class='flat'></th>"+
                    "</td>"+
                    "<td>"+value.name+"</td>"+
                    "<td>"+value.surname+"</td>"+
                    "<td>"+value.position+"</td>"+
                    "<td>"+value.employment_length+"</td>"+
                    "<td>"+value.past_projects+"</td>"+
                    "</tr>");
            });
        });
    var employeeArr = [1, 2, 3, 4, 5];
    var sendArr = "[";
    var c = 0;

    $('#removeEmployee').on('click', function (e) {
        e.preventDefault(); // disable the default form submit event
        $('#datatable-checkbox').find('input[type="checkbox"]:checked').each(function () {
            //this is the current checkbox
            var ind = $(this).parent().parent().attr('data-id');
            sendArr += "{ employee_id:" + ind + "},";

            c++;
            $(this).parent().parent().empty();
            $(this).parent().parent().remove();
            window.alert(sendArr);
        });
        c++;
        sendArr[sendArr.length - 1] = ']';

        $.get("project_edit_delete", sendArr, function (data, status) {
            window.alert("Employee Removed");
        });


    });

    $('#updateProject').on('click', function (e) {

        $.get("project_edit", {

            new_date: $("#ChangeDueDate").val()

        }, function (data, status) {
            window.alert("Project updated");
        });

    });
});