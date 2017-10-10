/**
 * Page: N/A
 * Functionality: Project View
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 18/08/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */

$(document).ready(function() {

    $.urlParam = function (name) {
        let  results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    };

    let  i = 0;

    $.get("get_tasks", {id: $.urlParam('id')},
        function (data, status) {
            $("#sortable").empty();
            i=0;
            $.each(data, function (key, value) {
                if(value.status=="active"){
                    $("#sortable").append("<li class='ui-state-default'>" +
                        "<div >" +
                        "<label>" +
                        "<input id="+value._id+" class='cbx' type='checkbox' />"+value.description+"</label>" +
                        "</div>" +
                        "</li>");
                    i++;
                }
            });
            $("#count_task").append(i+" Tasks left");
        });

    let  emp_ids = [];
    let  empr_names = [];

    $.get("data_project_edit", {id: $.urlParam('id')},
        function (data, status) {

            $("#budget").append(data.project_budget);
            $("#project_name").append(data.name);
            $("#start_date").append(data.project_start_date.substr(0,10));
            $("#end_date").append(data.project_end_date.substr(0,10));
            $("#owner_contact").append(data.owner_contact);
            $("#owner_email").append(data.owner_email);
            $("#project_owner").append(data.owner_name);
            $("#description").append(data.description);
        });

    $.get("get_milestones",{id:$.urlParam('id')},
        function(data, status){
            $("#milestone").empty();
            $.each(data, function (key, value) {
                $("#milestone").append(
                    "<option value='"+value._id+"'>"+
                    value.description+
                    "</option>");
            });
        });

    $.get("find_project_users", {id:$.urlParam('id')},
        function (data, status) {
            $("#AllocateTask").empty();
            $.each(data.data, function (key, value) {
                if(value.role=="Employee"){
                    emp_ids[key]=value._id;
                    empr_names[key]=value.name;
                    $("#AllocateTask").append(
                        "<option value='"+value.name+"'>"+
                        value.name+
                        "</option>");
                }
             });

            $('.multiselect-ui').multiselect({
                includeSelectAllOption: true,
                nonSelectedText: 'Allocate Task To'
            });

            $("#AllocateTask").multiselect('refresh');
        });


    $('#submit-task').on('click', function (e) {
        let  milestone = $("#milestone_select").val();
        let  task = $("#task").val();
        let  selected_emp = $("#AllocateTask").val();
        let  emp = [];
        let  x = 0;

        for (let  i = 0; i < emp_ids.length; i++) {
            if (selected_emp.includes(empr_names[i])) {
                emp[x] = emp_ids[i];
                x++;
            }
        }

        $.get("create_task", {
            project_id:$.urlParam('id'),
                milestone_id:milestone,
                task:task,
                emp_assigned:emp
            },
            function (data, status) {
                $.get("get_tasks", {id: $.urlParam('id')},
                    function (data, status) {
                        $("#sortable").empty();
                        i=0;

                        $.each(data, function (key, value) {
                            if(value.status=="active"){
                                $("#sortable").append("<li class='ui-state-default'>" +
                                    "<div >" +
                                    "<label>" +
                                    "<input id="+value._id+" class='cbx' type='checkbox' />"+value.description+"</label>" +
                                    "</div>" +
                                    "</li>");
                                i++;
                            }
                        });
                        $("#count_task").empty().append(i+" Tasks left");
                    });
            });
    });
});
