/**
 * Created by Seonin David on 2017/09/29.
 */
$(document).ready(function() {
    $(window).on("load",function () {
        get_all_projects();
    });

    function get_all_projects(){
        $.get("get_all_approvals", {}, function (data, status) {


            $('#approvalPageTable').empty();
            $('#approvalPageTable').append(
                "<table class='table table-striped projects'>" +
                "<thead>" +
                "<tr>" +
                "<th style='width:1%'>#</th>" +
                "<th style='width:20%'>Project Name</th>" +
                "<th style=\"width: 20%\">Options</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody id='approvalViewTable'>" +
                "</tbody>" +
                "</table>"
            );

            let app_id;

            $.each(data, function (key, value) {

                app_id="employee_swap?id="+value._id;
                $("#approvalViewTable").append("<tr>" +
                    "<td>" +
                    "#" +
                    "</td>" +
                    "<td>" +
                    "<a id='project_name'></a>" +
                    "</td>" +
                    "<td>"+
                    "<a href="+app_id+" class='btn btn-primary btn-xs'><i class='fa fa-folder'></i> View </a>"+
                    "</td>"+
                    "</tr>");
                $.get("data_project_edit", {id:value.project_id}, function (data, status) {
                    window.alert(data.name);
                    $("#project_name").append(data.name);
                });

            });

        });
    }
});