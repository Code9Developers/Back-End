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
$.urlParam = function(name){
    let  results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};
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

    let _id=$.urlParam('id')
    $EmployeeAllocationDTEdit.dataTable({
        order: [[ 1, 'asc' ]],
        ajax: "find_project_users?id="+_id,
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
            { data: "email" }
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

    let $EmployeeReplacementDTEdit = $('#EmployeeReplacementDT');

    $EmployeeReplacementDTEdit.on( 'click', 'tbody td:not(:first-child)', function (e)
    {
        this.inline( this );
    });

    $EmployeeReplacementDTEdit.DataTable({
        order: [[ 1, 'asc' ]],
        ajax: "get_all_employees",
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
            { data: "email" }
        ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        }
    });

    TableManageButtons.init();
}

$(document).ready(function() {
        let project_name;
        let project_id;
        $.get("data_project_edit", {id:$.urlParam('id')},
            function (data, status) {
                let  tempDateArray=(data.project_end_date.substr(0,10)).split("-");
                let  newDate=(tempDateArray[2]+"/"+tempDateArray[1]+"/"+tempDateArray[0]).toString();
                project_name=data.name;
                project_id=data._id;
                $("#CurrentDeadline").val(newDate);

                $('#updateProject').on('click', function (e) {
                    $("#CurrentDeadline").empty();
                    $("#CurrentDeadline").val( $("#ChangeDueDate").val());
                    DeadlineChanged();
                    $.ajax({
                        url: 'change_project_date',
                        type: "GET",
                        data: {
                            new_date: $("#ChangeDueDate").val(),
                            id:$.urlParam('id')
                            // director:$("#director_select1").val()
                        }
                    });
                });
            });

        // $.get("get_directors",{},
        //     function(data, status){
        //         $("#director1").empty();
        //         $("#director1").append(
        //             "<div class='form-group'>"+
        //             "<div class='col-md-12 col-sm-12 col-xs-12'>"+
        //             "<select type='text' id='director_select1' class='form-control'>"+
        //             "<optgroup label='Director' id='director2'>"+
        //             "<option disabled selected>Select Director</option>"+
        //             "</optgroup>"+
        //             "</select>"+
        //             "<br/><input id='updateProject' type='submit' class='btn btn-conf btn-dark docs-tooltip' data-toggle='tooltip' value='Update Project'/>"+
        //             "</div>"
        //         );
        //         $.each(data, function (key, value) {
        //             $("#director2").append(
        //                 "<option value='"+value._id+"'>"+
        //                 value.name+" "+value.surname+
        //                 "</option>");
        //         });

          //  });

    init_EmployeeAllocationDTEdit();
    init_EmployeeReplacementDTEdit();
    let emp_selected_ids = [];
    let count = 0;
    $('#EmployeeAllocationDTEdit').on('click', 'input[type="checkbox"]', function (e) {

        var table = $('#EmployeeAllocationDTEdit').DataTable();
        let $row = $(this).closest('tr');
        let data = table.row($row).data();

        if (this.checked) {
            $row.addClass('selected');
            emp_selected_ids[count] = data._id;
            count++;
        } else {
            $row.removeClass('selected');
            count--;
            emp_selected_ids.length--;
        }
        e.stopPropagation();
    });
    $('#EmployeeAllocationDTEdit').on('click', 'tbody td, thead th:first-child', function (e) {
        $(this).parent().find('input[type="checkbox"]').trigger('click');
    });


    let replacement_ids = [];
    let rep_count = 0;
    $.get("get_directors", {},
        function (data, status) {
            $("#director").empty();
            $.each(data, function (key, value) {
                $("#director").append(
                    "<option value='" + value._id + "'>" +
                    value.name + " " + value.surname +
                    "</option>");
            });
        });

    $('#EmployeeReplacementDT').on('click', 'input[type="checkbox"]', function (e) {
        let table = $('#EmployeeReplacementDT').DataTable();
        let $row = $(this).closest('tr');
        let data = table.row($row).data();
        if (this.checked) {
            $row.addClass('selected');
            replacement_ids[rep_count] = data._id;
            rep_count++;
        } else {
            $row.removeClass('selected');
            rep_count--;
            replacement_ids.length--;

        }
        e.stopPropagation();
    });

    $('#EmployeeReplacementDT').on('click', 'tbody td, thead th:first-child', function (e) {
        $(this).parent().find('input[type="checkbox"]').trigger('click');
    });

    $('#removeEmployee').on('click', function (e) {
        $.get("edit_replacement_store", {
            emp_removed:emp_selected_ids,
            emp_replace:replacement_ids,
            reason:$("#empRemoval").val(),
            director:$("#director_select").val(),
            project_name:project_name,
            project_id:project_id
        });
        SendApproval();
    });
});