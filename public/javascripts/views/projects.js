/**
 * Created by Seonin David on 2017/08/16.
 */
$(document).ready(function() {

    $.get("all_projects", {}, function (data, status) {


        $('#projectsPageTable').empty();
        $('#projectsPageTable').append("<table class='table table-striped projects'>" +
            "<thead>" +
            "<tr>" +
            "<th style='width: 1%'>#</th>" +
            "<th style='width: 20%'>Project Name</th>" +
            "<th>Team Members</th>" +
            " <th>Project Progress</th>" +
            "<th>Status</th>" +
            "<th style='width: 20%'>#Edit</th>" +
            " </tr>" +
            " </thead>" +
            "<tbody id='projViewTable'>" +
            "</tbody>" +
            "</table>"
        );
        //window.alert(data.projects);
        //data = JSON.parse(data);
        var i=0;
        var edit_id,view_id,milestone_pid;
        $.each(data, function (key, value) {
            // console.log(value.name);
            edit_id="project_edit?id="+value._id;
            view_id="project_detail?id="+value._id;
            milestone_pid="project_milestone?id="+value._id;

            $("#projViewTable").append("<tr>" +
                "<td>" +
                "#" +
                "</td>" +
                "<td>" +
                "<a>" + value.name + "</a>" +
                "<br/>" +
                "<small>Date created: " + value.project_start_date.substr(0,10) + "</small>" +
                "</td>" +
                "<td>"+
                "<ul class='list-inline'>"+
                "</ul>"+
                "</td>" +
                "<td class='project_progress'>" +
                "<div class='progress progress_sm'>" +
                "<div class='progress-bar bg-green' role='progressbar' data-transitiongoal='50'></div>" +
                "</div>" +
                "<small>" + 50 + "% Complete</small>" +
                "</td>" +
                "<td>" +
                "<button type='button' class='btn btn-kpmg btn-xs'>Ongoing</button>" +
                "</td>" +
                "<td>"+
                "<a href="+view_id+" class='btn btn-primary btn-xs'><i class='fa fa-folder'></i> View </a>"+
                "<a href="+milestone_pid+" class='btn btn-warning btn-xs'><i class='fa fa-trophy'></i> Milestones </a>"+
                "<a href="+edit_id+" class='btn btn-info btn-xs'><i class='fa fa-pencil'></i> Edit </a>"+
                "<a href='#' class='btn btn-danger btn-xs'><i class='fa fa-trash-o'></i> Delete </a>"+
                "</td>"+
                "</tr>");

            for(var y=0;y<(value.employees_assigned).length;y++)
            {
                $(".list-inline").append(
                "<li>"+
                "<img src='images/user.png' class='avatar' alt='Avatar'>"+
                "</li>"
                );
            }

        });

    });
});