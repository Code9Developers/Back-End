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
        $.each(data.projects, function (key, value) {
            // console.log(value.name);
            // window.alert(value.project_name);
            $("#projViewTable").append("<tr>" +
                "<td>" +
                "#" +
                "</td>" +
                "<td>" +
                "<a>" + value.project_name + "</a>" +
                "<br/>" +
                "<small>" + value.date_created + "</small>" +
                "</td>" +
                "<td>" + value.num_emp +
                "</td>" +
                "<td class='project_progress'>" +
                "<div class='progress progress_sm'>" +
                "<div class='progress-bar bg-green' role='progressbar' data-transitiongoal='" + value.progress + "'></div>" +
                "</div>" +
                "<small>" + value.progress + "% Complete</small>" +
                "</td>" +
                "<td>" +
                "<button type='button' class='btn btn-success btn-xs'>Success</button>" +
                "</td>" +
                "<td>" +
                "<a href='#' class='btn btn-primary btn-xs'><i class='fa fa-folder'></i> View </a>" +
                "<a href='#' class='btn btn-info btn-xs'><i class='fa fa-pencil'></i> Edit </a>" +
                "<a href='#' class='btn btn-danger btn-xs'><i class='fa fa-trash-o'></i> Delete </a>" +
                "</td>" +
                "</tr>");
        });

    });
});