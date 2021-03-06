/**
 * Page: N/A
 * Functionality: Employee Swap
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 23/09/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

$.get("get_deleted_employees", {id: $.urlParam('id')},function (data, status) {
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
        "<th>Skill</th>" +
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
            "<td>"+value.skill+"</td>"+
            "</tr>");
    });
});
$.get("replacement_reason", {id: $.urlParam('id')},function (data, status) {
    $("#empRemoval").val(data);
});
$.get("get_replacement_employees", {id: $.urlParam('id')},function (data, status) {
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
        "<th>Skill</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody id='emptBody1'></tbody></table>" +
        "<br/>");
    $.each(data,function(key,value){
        $("#emptBody1").append("<tr id="+key+">"+
            "<td>"+value._id.name+"</td>"+
            "<td>"+value._id.surname+"</td>"+
            "<td>"+value._id.position+"</td>"+
            "<td>"+value._id.employment_length+"</td>"+
            "<td>"+value._id.skill[0].name+"</td>"+
            "</tr>");
    });
});

$("#acceptChange").on("click",function (e) {
    ApproveApproval();
    $.get("approved_replacement", {id: $.urlParam('id')});
    $(this).attr("disabled", "disabled");
    setTimeout(function(){  $( location ).attr("href", "director_dashboard"); }, 2000);
});

$("#denyChange").on("click",function (e) {

    RejectApproval();
    $.get("rejected_replacement", {id: $.urlParam('id')});
    $(this).attr("disabled", "disabled");
    setTimeout(function(){  $( location ).attr("href", "director_dashboard"); }, 2000);

});