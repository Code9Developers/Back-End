/**
 * Page: N/A
 * Functionality: Projects
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 16/08/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 * Date Revised: 02/10/2017 by Seonin David
 */
$(document).ready(function() {

    $.get("all_projects", {}, function (data, status) {

        var i=0;
        var edit_id,view_id,milestone_pid,remove_pid;
        $("#projViewTable").empty();
        $.each(data, function (key, value) {
            let all_tasks=value.tasks;
            let progress=0;
            if(all_tasks.length==0){
                edit_id="project_edit?id="+value._id;
                view_id="project_detail?id="+value._id;
                milestone_pid="project_milestone?id="+value._id;
                remove_pid="project_remove?id="+value._id;
                value.status[0]=(value.status[0]).toUpperCase();
                let  tempDateArray=(value.project_start_date.substr(0,10)).split("-");
                let  newDate=(tempDateArray[2]+"/"+tempDateArray[1]+"/"+tempDateArray[0]).toString();
                $("#projViewTable").append("<tr>" +
                    "<td>" +
                    "<a>" + value.name + "</a>" +
                    "<br/>" +
                    "<small>Date created: " + newDate + "</small>" +
                    "</td>" +
                    "<td>"+
                    "<ul class='list-inline' id="+value._id+">"+
                    "</ul>"+
                    "</td>" +
                    "<td class='project_progress'>" +
                    "<div class='progress progress-bar-success progress-striped proj_progress'>" +
                    "<div class='progress-bar ' role='progressbar' data-transitiongoal="+progress+"></div>" +
                    "</div>" +
                    "</td>"+
                    "<td><button type='button' class='btn btn-kpmg btn-xs'>"+value.status+"</button></td>"+
                    "<td>"+
                    "<a href="+view_id+" class='btn btn-primary btn-xs'><i class='fa fa-folder'></i> View </a>"+
                    "<a href="+milestone_pid+" class='btn btn-warning btn-xs'><i class='fa fa-trophy'></i> Milestones </a>"+
                    "<a href="+edit_id+" class='btn btn-info btn-xs'><i class='fa fa-pencil'></i> Edit </a>"+
                    "<a id="+value._id+"  class='btn btn-danger btn-xs remove'><i class='fa fa-trash-o'></i> Complated </a>"+
                    "</td>"+
                    "</tr>");
                var len=(value.employees_assigned).length;
                if(len>0){
                    for(var y=0;y<len;y++)
                    {
                        $("#"+value._id).append(
                            "<li>"+
                            "<img src='images/user.png' class='avatar' alt='Avatar'>"+
                            "</li>"
                        );
                    }
                }
                $('.proj_progress .progress-bar').progressbar({display_text: 'fill'});
                $(".remove").on("click",function () {
                    $(this).parent().parent().hide();
                    $.get("remove_project",{
                        project_id:$(this).attr("id")
                    });

                });
            }
            else{
                $.get("get_finished_tasks", {ids:all_tasks}, function (data, status) {
                    let completed_tasks=data;
                    progress=(completed_tasks.length/all_tasks.length)*100;
                    edit_id="project_edit?id="+value._id;
                    view_id="project_detail?id="+value._id;
                    milestone_pid="project_milestone?id="+value._id;
                    remove_pid="project_remove?id="+value._id;
                    value.status[0]=(value.status[0]).toUpperCase();

                    let  tempDateArray=(value.project_start_date.substr(0,10)).split("-");
                    let  newDate=(tempDateArray[2]+"/"+tempDateArray[1]+"/"+tempDateArray[0]).toString();
                    $("#projViewTable").append("<tr>" +
                        "<td>" +
                        "<a>" + value.name + "</a>" +
                        "<br/>" +
                        "<small>Date created: " + newDate + "</small>" +
                        "</td>" +
                        "<td>"+
                        "<ul class='list-inline' id="+value._id+">"+
                        "</ul>"+
                        "</td>" +
                        "<td class='project_progress'>" +
                        "<div class='progress progress-striped proj_progress'>" +
                        "<div class='progress-bar ' role='progressbar' data-transitiongoal="+progress+"></div>" +
                        "</div>" +
                        "</td>"+
                        "<td><button type='button' class='btn btn-kpmg btn-xs'>"+value.status+"</button></td>"+
                        "<td>"+
                        "<a href="+view_id+" class='btn btn-primary btn-xs'><i class='fa fa-folder'></i> View </a>"+
                        "<a href="+milestone_pid+" class='btn btn-warning btn-xs'><i class='fa fa-trophy'></i> Milestones </a>"+
                        "<a href="+edit_id+" class='btn btn-info btn-xs'><i class='fa fa-pencil'></i> Edit </a>"+
                        "<a id="+value._id+"  class='btn btn-danger btn-xs remove'><i class='fa fa-trash-o'></i> Completed </a>"+
                        "</td>"+
                        "</tr>");
                    var len=(value.employees_assigned).length;
                    if(len>0){
                        for(var y=0;y<len;y++)
                        {
                            $("#"+value._id).append(
                                "<li>"+
                                "<img src='images/user.png' class='avatar' alt='Avatar'>"+
                                "</li>"
                            );
                        }
                    }
                    $('.proj_progress .progress-bar').progressbar({display_text: 'fill'});
                    $(".remove").on("click",function () {
                        $(this).parent().parent().hide();
                        $.get("remove_project",{
                            project_id:$(this).attr("id")
                        });

                    });
                });
            }

        });

    });
});