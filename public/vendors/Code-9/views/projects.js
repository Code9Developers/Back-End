/**
 * Page: N/A
 * Functionality: Projects
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 16/08/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
$(document).ready(function() {

    $.get("all_projects", {}, function (data, status) {


        $('#projectsPageTable').empty();
        $('#projectsPageTable').append(
            "<table class='table table-striped projects'>" +
                "<thead>" +
                    "<tr>" +
                        "<th style='width:1%'>#</th>" +
                        "<th style='width:20%'>Project Name</th>" +
                        "<th>Team Members</th>" +
                        "<th>Project Progress</th>" +
                        "<th>Status</th>" +
                        "<th style=\"width: 20%\">Options</th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody id='projViewTable'>" +
                "</tbody>" +
            "</table>"
        );
        //window.alert(data.projects);
        //data = JSON.parse(data);
        let  i=0;
        let  edit_id,view_id,milestone_pid,remove_pid;
        $.each(data, function (key, value) {
            // console.log(value.name);
            edit_id="project_edit?id="+value._id;
            view_id="project_detail?id="+value._id;
            milestone_pid="project_milestone?id="+value._id;
            remove_pid="project_remove?id="+value._id;

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
                "<ul class='list-inline' id="+value._id+">"+
                "</ul>"+
                "</td>" +
                "<td class='project_progress'>" +
                "<div class='progress progress_sm'>" +
                "<div class='progress-bar bg-kpmg-bar' role='progressbar' data-transitiongoal=\"51\"></div>" +
                "</div>" +
                "<small>" + 51 + "% Complete</small>" +
                "</td>" +
                "<td>");
            if(value.status=="pending"){
                $("#projViewTable").append("<button type='button' class='btn btn-warning btn-xs'>Pending</button>" );
            }
            else
            {
                $("#projViewTable").append("<button type='button' class='btn btn-kpmg btn-xs'>Ongoing</button>");
            }
            $("#projViewTable").append( "</td>" +
                "<td>"+
                "<a href="+view_id+" class='btn btn-primary btn-xs'><i class='fa fa-folder'></i> View </a>"+
                "<a href="+milestone_pid+" class='btn btn-warning btn-xs'><i class='fa fa-trophy'></i> Milestones </a>"+
                "<a href="+edit_id+" class='btn btn-info btn-xs'><i class='fa fa-pencil'></i> Edit </a>"+
                "<a id="+value._id+"  class='btn btn-danger btn-xs remove'><i class='fa fa-trash-o'></i> Remove </a>"+
                "</td>"+
                "</tr>");
            let  len=(value.employees_assigned).length;
            if(len>0){
                for(let  y=0;y<len;y++)
                {
                    $("#"+value._id).append(
                        "<li>"+
                        "<img src='images/user.png' class='avatar' alt='Avatar'>"+
                        "</li>"
                    );
                }
            }

        });
        $(".remove").on("click",function () {
            $.get("remove_project",{
                project_id:$(this).attr("id")
            });

        });
    });
});