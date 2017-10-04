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

    let num_employees=($('#range_31').val()).split(";");
    let num_emp= parseInt(num_employees[1]);
    let skills=$('#skills').val();
    alert(skills);
    let start_date= $('#start_date').val();//either to calculation to get number in days or put end date
    let end_date=$('#end_date').val();

    $EmployeeAllocationDT.dataTable({
        order: [[ 1, 'asc' ]],
        ajax: "get_json_data?num_empl="+num_emp+"&start_date="+start_date+"&end_date="+end_date+"&skills="+skills,
        //ajax: "get_json_data?skills%5B%5D=Windows+%2F+Linux+Security&skills%5B%5D=Database+Security&skills%5B%5D=Security+Gap+Assessments&start_date=17%2F08%2F2017&end_date=18%2F09%2F2017",
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

    let num_employees=($('#range_31').val()).split(";");
    let num_emp= parseInt(num_employees[1]);
    let skills=$('#skills').val();
    let start_date= $('#start_date').val();//either to calculation to get number in days or put end date
    let    end_date=$('#end_date').val();
    $EmployeeReplacementDT.dataTable({
        order: [[ 1, 'asc' ]],
        ajax: "get_replacement?num_empl="+num_emp,
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
        },

    });

    TableManageButtons.init();
}

$(document).ready(function() {

    $(".select-test").select2({
        tags: false
    });

    let  employeeArr = [];
    let  employee_array_replacements = [];
    let  globEmployees = null;
    let  emp_store=null;

    $('#holder').hide();
    $('#EmpAllocationTableHide').hide();
    $('#EmpReplacementTableHide').hide();

    $('#assignEmployees').on('click', function (e) {
        let  num_employees=($('#range_31').val()).split(";");

        e.preventDefault(); // disable the default form submit event

        // Create datatable for employees allocated
        init_EmployeeAllocationDT();

        /*Animation*/
        // setTimeout(function ()
        // {
        //     $('#demo-form').show();
        //     $('#holder').hide();
        // }, 4500);
        //
        $('#EmpAllocationTableHide').show();
        $("#table_content").append("<button id='replaceEmployee' type='button' class='btn docs-tooltip btn-warning btn-round' data-toggle='tooltip'>Get Replacements</button>");
    });


    let  sendArr = [];
    let  c = 0;
    $('#EmpAllocationDT').on('click','#replaceEmployee',function (e) {
        $('#datatable-checkbox').find('input[type="checkbox"]:checked').each(function ()
        {
            let  ind = $(this).parent().parent().attr('id');
            sendArr[c]=employeeArr[ind];
            c++;
        });
        c=0;

        // Show replacement table when button is clicked
        $('#EmpReplacementTableHide').show();

        $.get("get_replacement", {},function (data, status) {

            // Create datatable for replacement employees
            init_EmployeeReplacementDT();

            $("#table_content_Rep").append("<button id='removeEmployee' type='button' class='btn docs-tooltip btn-danger btn-round' data-toggle='tooltip' title='Remove selected employee/employees from project'>Remove Selection</button>");

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


    let replacement_array=[];
    let replacement_array_count=0;

    $('#employeeTable1').on('click','#removeEmployee',function (e) {
        e.preventDefault(); // disable the default form submit event

        $('#datatable-checkbox1').find('input[type="checkbox"]:checked').each(function () {
            let ind = $(this).parent().parent().attr('id');
            replacement_array[replacement_array_count]=employee_array_replacements[ind];
            replacement_array_count++;
        });
        replacement_array_count=0;


        $.get("replacement_store", {
            emp_removed:sendArr,
            emp_replace:replacement_array,
            reason:$("#empRemoval").val(),
            director:$("#director_select").val(),
            project_name:$("#projectname").val()
        });


    });



    $('#storeEmp').on('click', function (e) {
        ///e.preventDefault(); // disable the default form submit event
        let  num_employees=($('#range_31').val()).split(";");
        window.alert(JSON.stringify(emp_store));
        $.get("store_emp", {
            num_empl:num_employees[1],
            duration: 2,
            budget: $('#budget').val(),
            emplArr: JSON.stringify(emp_store)
        });
        //
        // if(globEmployees == null){
        //
        //     window.alert("Employees not assigned");
        //     $("#demo-form").submit(function(e){
        //         e.preventDefault();
        //     });
        // }else {
        //     let  num_employees=($('#range_31').val()).split(";");
        //     window.alert(JSON.stringify(globEmployees));
        //     $.get("store_emp", {
        //             num_empl:num_employees[1],
        //             duration: 2,
        //             budget: $('#budget').val(),
        //             emplArr: JSON.stringify(globEmployees)
        //         }, function (data, status) {
        //             //e.submit();
        //             $("#demo-form").submit();
        //         }
        //     )
        // }
    });
});
