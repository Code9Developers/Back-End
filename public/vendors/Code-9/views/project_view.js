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
$.urlParam = function (name) {
    let  results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

function make_graph() {
    $.get("/progress_analytics",{id:$.urlParam('id')},function (data, status) {
        let pc = document.getElementById('progressBarGraph').getContext('2d');
        let myChart = new Chart(pc, {
            type: 'bar',
            data: {
                labels: ["Completed", "Uncompleted"],
                datasets: [{
                    label: '# of Tasks',
                    data: data,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)', // GREEN
                        'rgba(255, 99, 132, 0.2)', // RED

                        // 'rgba(54, 162, 235, 0.2)', // BLUE
                        // 'rgba(255, 206, 86, 0.2)', // YELLOW
                        // 'rgba(153, 102, 255, 0.2)', // PURPLE
                        // 'rgba(255, 159, 64, 0.2)' // Orange
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255,99,132,1)',
                        //
                        // 'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Overall Project Progress Based On Tasks Completed To Tasks Uncompleted'
                }
            }
        });
    });
}

$("#sortable").sortable();
$("#sortable").disableSelection();

countTodos();

// all done btn
$("#checkAll").click(function(){
    AllDone();
});

//create todo
$('.add-todo').on('keypress',function (e) {
    e.preventDefault
    if (e.which == 13) {
        if($(this).val() != ''){
            var todo = $(this).val();
            createTodo(todo);
            countTodos();
        }else{
            // some validation
        }
    }
});
// mark task as done
$('.todolist').on('change','#sortable li input[type="checkbox"]',function(){
    if($(this).prop('checked')){
        $.get("remove_task", {task_id:$(".cbx").attr("id")});
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
                    else{

                        $("#done-items").append('<li>' + value.description +'</li>')
                    }
                });
                $("#count_task").empty();
                $("#count_task").append(i+" Tasks left");
                //$("#count_task").attr("id",i);
            });
        var doneItem = $(this).parent().parent().find('label').text();
        $(this).parent().parent().parent().addClass('remove');
        done(doneItem);
        countTodos();
    }
});



//delete done task from "already done"
$('.todolist').on('click','.remove-item',function(){
    removeItem(this);
});

// count tasks
function countTodos(){
    var count = $("#sortable li").length;
    $('.count-todos').html(count);
}

//create task
function createTodo(text){
    var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ text +'</label></div></li>';
    $('#sortable').append(markup);
    $('.add-todo').val('');
}

//mark task as done
function done(doneItem){
    var done = doneItem;
    var markup = '<li>'+ done +'</li>';
    $('#done-items').append(markup);
    $('.remove').remove();
}

//mark all tasks as done
function AllDone(){
    var myArray = [];

    $('#sortable li').each( function() {
        myArray.push($(this).text());
    });

    // add to done
    for (i = 0; i < myArray.length; i++) {
        $('#done-items').append('<li>' + myArray[i] + '</li>');
    }

    // myArray
    $('#sortable li').remove();
    countTodos();
}

//remove done task from list
function removeItem(element){
    $(element).parent().remove();
}

// profile activate for edit password
$('#editbutton').click(function ()
{
    $('#tab_content3').addClass('fade active in');
});
$(document).ready(function() {


    make_graph();
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
                else{
                    $("#done-items").append('<li>' + value.description +'</li>')
                }
            });
            $("#count_task").empty();
            $("#count_task").append(i+" Tasks left");
            //$("#count_task").attr("id",i);
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
                make_graph();
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
                        $("#count_task").empty();
                        $("#count_task").empty().append(i+" Tasks left");
                    });
            });
    });
});
