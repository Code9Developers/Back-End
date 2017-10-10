/**
 * Page: N/A
 * Functionality: Project Creation
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Nicaedin Suklal
 * Date Revised: 24/07/2017 by Nicaedin Suklal
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
let  globEmployees = null;
function init_EmployeeAllocationDT() {

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

    let $EmployeeAllocationDT = $('#EmployeeAllocationDT');

    $EmployeeAllocationDT.on( 'click', 'tbody td:not(:first-child)', function (e)
    {
        this.inline( this );
    });

    let assistant_manager_slider=($('#Assistant_Manager').val()).split(";");
    let assistant_manager= parseInt(assistant_manager_slider[1]);

    let supervisor_slider=($('#Supervisor').val()).split(";");
    let supervisor= parseInt(supervisor_slider[1]);

    let senior_analyst_slider=($('#Senior_Analyst').val()).split(";");
    let senior_analyst= parseInt(senior_analyst_slider[1]);

    let analyst_slider=($('#Analyst').val()).split(";");
    let analyst= parseInt(analyst_slider[1]);

    let junior_analyst_1_slider=($('#Junior_Analyst_1').val()).split(";");
    let junior_analyst_1= parseInt(junior_analyst_1_slider[1]);

    let junior_analyst_2_slider=($('#Junior_Analyst_2').val()).split(";");
    let junior_analyst_2= parseInt(junior_analyst_2_slider[1]);

    let position_array=["Assistant Manager"," Supervisor","Senior Analyst","Analyst","Junior Analyst 2","Junior Analyst 1"];
    let amount_array=[assistant_manager,supervisor,senior_analyst,analyst,junior_analyst_2,junior_analyst_1];


    let skills=$('#skills').val();
    let start_date= $('#start_date').val();//either to calculation to get number in days or put end date
    let end_date=$('#end_date').val();

    $EmployeeAllocationDT.dataTable({
        order: [[ 1, 'asc' ]],
        ajax: "get_json_data?position_arr="+position_array+"&amount_arr="+amount_array+"&start_date="+start_date+"&end_date="+end_date+"&skills="+skills,
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
            { data: "skill" }
        ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        },

    });

    TableManageButtons.init();
}

function init_EmployeeReplacementDT() {

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

    let $EmployeeReplacementDT = $('#EmployeeReplacementDT');

    $EmployeeReplacementDT.on( 'click', 'tbody td:not(:first-child)', function (e)
    {
        this.inline( this );
    });


    let skills=$('#skills').val();
    let start_date= $('#start_date').val();//either to calculation to get number in days or put end date
    let    end_date=$('#end_date').val();
    $EmployeeReplacementDT.dataTable({
        order: [[ 1, 'asc' ]],
        ajax: "get_replacement?start_date="+start_date+"&end_date="+end_date+"&skills="+skills,
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
            { data: "skill" }
        ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        },

    });

    TableManageButtons.init();
}

$(document).ready(function() {

    $(".select-test").select2({
        tags: false
    });

    $('#holder').hide();
    $('#EmpAllocationTableHide').hide();
    $('#EmpReplacementTableHide').hide();
    $('#removeEmployee').hide();
    $('#employeeRemoveReason').hide();
    $('#director_select').hide();

    $('#assignEmployees').on('click', function (e) {
        e.preventDefault(); // disable the default form submit event
        // Create datatable for employees allocated
       //position_array=["Assistant Manager"," Supervisor","Senior Analyst","Analyst","Junior Analyst 2","Junior Analyst 1"];


        $('#demo-form').hide();
        $('#holder').show();
        alg_animate();



        /*Animation*/

        //$('#holder').hide();
        $('#EmpAllocationTableHide').show();

        $("#table_content").append("<button id='replaceEmployee' type='button' class='btn docs-tooltip btn-warning btn-round' data-toggle='tooltip'>Get Replacements</button>");


    });

    let emp_selected_ids = [];
    let count = 0;
    $('#EmployeeAllocationDT').on('click', 'input[type="checkbox"]', function (e) {

        var table = $('#EmployeeAllocationDT').DataTable();
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
    $('#EmpAllocationDT').on('click', 'tbody td, thead th:first-child', function (e) {
        $(this).parent().find('input[type="checkbox"]').trigger('click');
    });

    let replacement_ids = [];
    let rep_count = 0;
    $('#EmpAllocationDT').on('click', '#replaceEmployee', function (e) {
        init_EmployeeReplacementDT();
        $('#EmpReplacementTableHide').show();
        $('#removeEmployee').show();
        $('#employeeRemoveReason').show();
        $('#director_select').show();

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
        $.get("replacement_store", {
            emp_removed:emp_selected_ids,
            emp_replace:replacement_ids,
            reason:$("#empRemoval").val(),
            director:$("#director_select").val(),
            project_name:$("#projectname").val()
         });
        SendApproval();
    });

    $('#createProjectbtn').on('click', function (e) {
        let table = $('#EmployeeAllocationDT').DataTable();

        globEmployees = table
            .rows()
            .data();
        let emp_data = [];
        for (let j in globEmployees) {
            emp_data[j] = globEmployees[j];
        }
        if (globEmployees == null) {

            window.alert("Employees not assigned");
            $("#demo-form").submit(function (e) {
                e.preventDefault();
            });
        } else {
            //var num_employees = ($('#range_31').val()).split(";");
            $.get("store_emp", {
                    emplArr: JSON.stringify(emp_data)
                }, function (data, status) {
                    $.post("project_creation",{
                        projectname:$("#projectname").val(),
                        projectdescription:$("#projectdescription").val(),
                        start_date:$("#start_date").val(),
                        end_date:$("#end_date").val(),
                        projectowner:$("#projectowner").val(),
                        projectownercontact:$("#ownercontact").val(),
                        projectowneremail:$("#projectowneremail").val(),
                        },function (data, status) {
                        $( location ).attr("href", data);
                    });
                  //  $("#demo-form").submit();
                }
            )
        }
    });
});
