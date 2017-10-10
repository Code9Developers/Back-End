/**
 * Created by Seonin David on 2017/10/01.
 */
$(document).ready(function() {
    $.get("all_projects_to_review", {}, function (data, status) {

        $('#projectsPageTable').empty();
        $('#projectsPageTable').append(
            "<table class='table table-striped projects'>" +
            "<thead>" +
            "<tr>" +
            "<th style='width:1%'>#</th>" +
            "<th style='width:20%'>Project Name</th>" +
            "<th>Team Members</th>" +
            "<th style=\"width: 20%\">Options</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody id='projViewTable'>" +
            "</tbody>" +
            "</table>"
        );

        var i=0;
        var review_id;
        $.each(data, function (key, value) {
            review_id="project_review?id="+value._id.id;
            let index=parseInt(key)+1;
            $("#projViewTable").append("<tr>" +
                "<td>" +
                index+
                "</td>" +
                "<td>" +
                "<a>" + value._id.name + "</a>" +
                "<br/>" +
                "<small>Date created: " + value._id.project_start_date.substr(0,10) + "</small>" +
                "</td>" +
                "<td>"+
                "<ul class='list-inline' id="+value._id.id+">"+
                "</ul>"+
                "</td>" +
                "<td>"+
                "<a href="+review_id+" class='btn btn-primary btn-xs'><i class='fa fa-folder'></i> Review </a>"+
                "</td>"+
                "</tr>");
           // alert(value._id.employees_assigned.length)
             var len=value._id.employees_assigned.length;
            if(len>0){
                for(var y=0;y<len;y++)
                {
                    $("#"+value._id.id).append(
                        "<li>"+
                        "<img src='images/user.png' class='avatar' alt='Avatar'>"+
                        "</li>"
                    );
                }
            }
        });
    });
});