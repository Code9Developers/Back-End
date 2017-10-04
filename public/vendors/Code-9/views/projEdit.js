/**
 * Page: N/A
 * Functionality: Project Edit
 * Note: TODO Change file name to project_edit and check the duplicate employeeArr deceleration
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 17/08/2017 by Nicaedin Suklal
 * Date Revised: 02/10/2017 by Joshua Moodley
 */

function init_EmployeeAllocationDTEdit() {

    console.log('run_datatables');

    if (typeof ($.fn.DataTable) === 'undefined') {
        return;
    }
    console.log('init_EmployeeAllocationDT');

    let handleDataTableButtons = function () {
        if ($("#datatable-buttons").length) {
            $("#datatable-buttons").DataTable({
                dom: "Bfrtip",
                buttons: [
                    {
                        extend: "copy",
                        className: "btn-sm"
                    },
                    {
                        extend: "csv",
                        className: "btn-sm"
                    },
                    {
                        extend: "excel",
                        className: "btn-sm"
                    },
                    {
                        extend: "pdfHtml5",
                        className: "btn-sm"
                    },
                    {
                        extend: "print",
                        className: "btn-sm"
                    },
                ],
                responsive: true
            });
        }
    };

    TableManageButtons = function () {
        "use strict";
        return {
            init: function () {
                handleDataTableButtons();
            }
        };
    }();

    let $EmployeeAllocationDTEdit = $('#EmployeeAllocationDTEdit');

    $EmployeeAllocationDTEdit.on( 'click', 'tbody td:not(:first-child)', function (e)
    {
        this.inline( this );
    });

    // let num_employees=($('#range_31').val()).split(";");
    // let num_emp= parseInt(num_employees[1]);
    // let skills=$('#skills').val();

    $EmployeeAllocationDTEdit.dataTable({
        order: [[ 1, 'asc' ]],
        ajax: "get_json_data",
        columns: [
            {
                data: "<th><div class=\"text-center\"><input name=\"\" type=\"checkbox\" id=\"check-all\" class=\"flat\"></div></th>",
                defaultContent: '<th><div class="text-center"><input name="" type="checkbox" id="check-all" class="flat"></div></th>',
                className: 'select-checkbox',
                orderable: false
            },
            { data: "name" },
            { data: "surname" },
            { data: "position" },
            { data: "employment_length" },
            { data: "past_projects" }
        ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        }
    });

    TableManageButtons.init();
}

function init_EmployeeReplacementDTEdit() {

    console.log('run_datatables');

    if (typeof ($.fn.DataTable) === 'undefined') {
        return;
    }
    console.log('init_EmployeeAllocationDT');

    let handleDataTableButtons = function () {
        if ($("#datatable-buttons").length) {
            $("#datatable-buttons").DataTable({
                dom: "Bfrtip",
                buttons: [
                    {
                        extend: "copy",
                        className: "btn-sm"
                    },
                    {
                        extend: "csv",
                        className: "btn-sm"
                    },
                    {
                        extend: "excel",
                        className: "btn-sm"
                    },
                    {
                        extend: "pdfHtml5",
                        className: "btn-sm"
                    },
                    {
                        extend: "print",
                        className: "btn-sm"
                    },
                ],
                responsive: true
            });
        }
    };

    TableManageButtons = function () {
        "use strict";
        return {
            init: function () {
                handleDataTableButtons();
            }
        };
    }();

    let $EmployeeReplacementDTEdit = $('#EmployeeReplacementDTEdit');

    $EmployeeReplacementDTEdit.on( 'click', 'tbody td:not(:first-child)', function (e)
    {
        this.inline( this );
    });

    // let num_employees=($('#range_31').val()).split(";");
    // let num_emp= parseInt(num_employees[1]);
    // let skills=$('#skills').val();

    $EmployeeReplacementDTEdit.DataTable({
        order: [[ 1, 'asc' ]],
        ajax: "get_json_data",
        columns: [
            {
                data: "<th><div class=\"text-center\"><input name=\"\" type=\"checkbox\" id=\"check-all\" class=\"flat\"></div></th>",
                defaultContent: '<th><div class="text-center"><input name="" type="checkbox" id="check-all" class="flat"></div></th>',
                className: 'select-checkbox',
                orderable: false
            },
            { data: "name" },
            { data: "surname" },
            { data: "position" },
            { data: "employment_length" },
            { data: "past_projects" }
        ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        }
    });

    TableManageButtons.init();
}

$(document).ready(function() {
    let  employeeArr = [];

    $.urlParam = function(name){
        let  results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    };

        $.get("data_project_edit", {id:$.urlParam('id')},
            function (data, status) {
                let  tempDateArray=(data.project_end_date.substr(0,10)).split("-");
                let  newDate=(tempDateArray[2]+"/"+tempDateArray[1]+"/"+tempDateArray[0]).toString();
                $("#CurrentDeadline").val(newDate);
            });

        $.get("get_directors",{},
            function(data, status){
                $("#director1").empty();
                $("#director1").append(
                    "<div class='form-group'>"+
                    "<div class='col-md-12 col-sm-12 col-xs-12'>"+
                    "<select type='text' id='director_select1' class='form-control'>"+
                    "<optgroup label='Director' id='director2'>"+
                    "<option disabled selected>Select Director</option>"+
                    "</optgroup>"+
                    "</select>"+
                    "<br/><input id='updateProject' type='submit' class='btn btn-conf btn-dark docs-tooltip' data-toggle='tooltip' value='Update Project'/>"+
                    "</div>"
                );
                $.each(data, function (key, value) {
                    $("#director2").append(
                        "<option value='"+value._id+"'>"+
                        value.name+" "+value.surname+
                        "</option>");
                });
                $('#updateProject').on('click', function (e) {
                    window.alert("Hello");
                    $.ajax({
                        url: 'change_project_date',
                        type: "GET",
                        data: {
                            new_date: $("#ChangeDueDate").val(),
                            id:$.urlParam('id'),
                            director:$("#director_select1").val()
                        }
                    });
                });
            });


        // let  employeeArr = [];
        let  employee_array_replacements = [];
        let  globEmployees = null;
        let  emp_store=null;

        // Set Datatables
        init_EmployeeAllocationDTEdit();
        init_EmployeeReplacementDTEdit();

        $.get("find_project_users", {id:$.urlParam('id')},
            function (data, status) {

                // $("#employeeTable").append("<button id='replaceEmployee' type='button' class='btn docs-tooltip btn-warning btn-round' data-toggle='tooltip'>Get Replacements</button>");

                emp_store = data;

                // $.each(data,function(key,value){
                //     employeeArr[key]=value._id;
                //     $("#emptBody").append("<tr id="+key+">"+
                //         "<td>"+
                //         "<th><input type='checkbox' id='check-all' class='flat'></th>"+
                //         "</td>"+
                //         "<td>"+value.name+"</td>"+
                //         "<td>"+value.surname+"</td>"+
                //         "<td>"+value.position+"</td>"+
                //         "<td>"+value.employment_length+"</td>"+
                //         "<td>"+value.past_projects+"</td>"+
                //         "</tr>");
                // });
            });



    let  sendArr = [];
    let  c = 0;
    $('#employeeTable').on('click','#replaceEmployee',function (e) {
        $('#datatable-checkbox').find('input[type="checkbox"]:checked').each(function () {
            let  ind = $(this).parent().parent().attr('id');
            sendArr[c]=employeeArr[ind];
            c++;
        });
        c=0;

        $.get("get_replacement", {},function (data, status) {


            // $("#table_content_RepEdit").append("<button id='removeEmployee' type='button' class='btn docs-tooltip btn-danger btn-round' data-toggle='tooltip' title='Remove selected employee/employees from project'>Remove Selection</button>");

            $.get("get_directors",{},
                function(data, status){
                    $("#director").empty();
                    $.each(data, function (key, value) {
                        $("#director").append(
                            "<option value='"+value._id+"'>"+
                            value.name+" "+value.surname+
                            "</option>");
                    });
                });
            globEmployees = data;
            let  contains=false;
            $.each(data,function(key,value){
                for(let  x=0;x<sendArr.length;x++){
                    if(sendArr[x]==value._id){
                        contains=true;
                    }
                }
                if(contains==false){
                    employee_array_replacements[key]=value._id;
                    $("#emptBody1").append("<tr id="+key+">"+
                        "<td>"+
                        "<td><th><input type='checkbox' id='check-all' class='flat'></th>"+
                        "</td>"+
                        "<td>"+value.name+"</td>"+
                        "<td>"+value.surname+"</td>"+
                        "<td>"+value.position+"</td>"+
                        "<td>"+value.employment_length+"</td>"+
                        "<td>"+value.past_projects+"</td>"+
                        "</tr>");
                }

                contains=false;
            });
        });
    });


    let  replacement_array=[];
    let  replacement_array_count=0;


    $('#employeeTable1').on('click','#removeEmployee',function (e) {
        e.preventDefault(); // disable the default form submit event

        $('#datatable-checkbox1').find('input[type="checkbox"]:checked').each(function () {
            let  ind = $(this).parent().parent().attr('id');
            replacement_array[c]=employee_array_replacements[ind];
            replacement_array_count++;
        });
        replacement_array_count=0;


        $.ajax({
            url: 'replacement_store',
            type: "GET",
            data: {
                emp_removed:sendArr,
                emp_replace:replacement_array,
                reason:$("#empRemoval").val(),
                director:$("#director_select").val()
            },
        });

    });
});