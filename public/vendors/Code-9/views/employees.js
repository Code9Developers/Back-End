/**
 * Page: N/A
 * Functionality: Employees
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 16/08/2017 by Seonin David
 * Date Revised: 23/08/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
$(document).ready(function() {

    $.get("all_employees", {}, function (data, status) {


        $('#projectsPageTable').empty();
        $('#projectsPageTable').append(
            "<table class='table table-striped projects'>" +
            "<thead>" +
            "<tr>" +
            "<th style='width:1%'>#</th>" +
            "<th style='width:20%'>Name</th>" +
            "<th>Email</th>" +
            "<th>Position</th>" +
            "<th>Employment Length</th>" +
            "<th style=\"width: 20%\">Options</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody id='projViewTable'>" +
            "</tbody>" +
            "</table>"
        );

        var i=0;
        // var edit_id,view_id,milestone_pid;
        $.each(data, function (key, value) {
            // console.log(value.name);

           // view_id="";//"project_detail?id="+value._id;


            $("#projViewTable").append("<tr>" +
                "<td>" +
                "#" +
                "</td>" +
                "<td>" +
                "<a>" + value.name+" "+value.surname + "</a>" +
                "<br/>" +
                // "<small>Date created: " + value.project_start_date.substr(0,10) + "</small>" +
                "</td>" +
                "<td>"+
                "<a>" + value.email+"</a>" +
                "</td>" +
                "<td class='position'>" +
                "<a>" + value.position+"</a>" +
                "</td>" +
                "<td>" +
                "<a>" + value.employment_length+"</a>" +
                "</td>" +
                "<td>"+
                "<a href='#'  class='btn btn-primary btn-xs'><i class='fa fa-folder'></i> View </a>"+
                "<a id="+value._id+" class='btn btn-danger btn-xs emp'><i class='fa fa-trash-o'></i> Delete </a>"+
                "</td>"+
                "</tr>");

        });
        $(".emp").on("click",function () {
            $(this).parent().parent().hide();
            $.get("remove_emp",{
                user_id:$(this).attr("id")
            });
        });
    });


});