/**
 * Created by Seonin David on 2017/09/23.
 */
$.get("get_deleted_employees", {},function (data, status) {
    $("#employeeTableRemoveList").empty();
    $("#employeeTableRemoveList").append(
        "<div class='x_title'>" +
        "<ul class='nav navbar-right panel_toolbox'>" +
        "<li style='float: right'><a class='collapse-link'><i class='fa fa-chevron-up'></i></a></li>" +
        "</ul>" +
        "<div class='clearfix'></div>" +
        "</div>" +
        "<div class='x_content'>" +
        "<p class='text-muted font-13 m-b-30'>" +
        "<p>" +
        "<table  class='table table-striped table-bordered bulk_action' >" +
        "<thead>" +
        "<th>Name</th>" +
        "<th>Surname</th>" +
        "<th>Position</th>" +
        "<th>Employment Length</th>" +
        "<th>Projects Completed</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody id='emptBody'></tbody></table>" +
        "<br/>");
    $.each(data,function(key,value){
        $("#emptBody").append("<tr id="+key+">"+
            "<td>"+value.name+"</td>"+
            "<td>"+value.surname+"</td>"+
            "<td>"+value.position+"</td>"+
            "<td>"+value.employment_length+"</td>"+
            "<td>"+value.past_projects+"</td>"+
            "</tr>");
    });
});
$.get("replacement_reason", {},function (data, status) {
    $("#empRemoval").val(data);
});
$.get("get_replacement_employees", {},function (data, status) {
    $("#employeeTableAddList").empty();
    $("#employeeTableAddList").append(
        "<div class='x_title'>" +
        "<ul class='nav navbar-right panel_toolbox'>" +
        "<li style='float: right'><a class='collapse-link'><i class='fa fa-chevron-up'></i></a></li>" +
        "</ul>" +
        "<div class='clearfix'></div>" +
        "</div>" +
        "<div class='x_content'>" +
        "<p class='text-muted font-13 m-b-30'>" +
        "<p>" +
        "<table  class='table table-striped table-bordered bulk_action' >" +
        "<thead>" +
        "<th>Name</th>" +
        "<th>Surname</th>" +
        "<th>Position</th>" +
        "<th>Employment Length</th>" +
        "<th>Projects Completed</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody id='emptBody1'></tbody></table>" +
        "<br/>");
    $.each(data,function(key,value){
        $("#emptBody1").append("<tr id="+key+">"+
            "<td>"+value.name+"</td>"+
            "<td>"+value.surname+"</td>"+
            "<td>"+value.position+"</td>"+
            "<td>"+value.employment_length+"</td>"+
            "<td>"+value.past_projects+"</td>"+
            "</tr>");
    });
});

$("#acceptChange").on("click",function (e) {
    $.get("approved_replacement");
});