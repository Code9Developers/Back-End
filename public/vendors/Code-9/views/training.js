/**
 * Created by Seonin David on 2017/10/04.
 */
$(document).ready(function (){

    let rows_selected = [];
    // let table;
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

    let $EmployeeTrainingAllocationDT = $('#EmployeeTrainingAllocationDT');

    /* $EmployeeTrainingAllocationDT.on( 'click', 'tbody td:not(:first-child)', function (e)
     {
     this.inline( this );
     });*/

    $('#EmployeeTrainingAllocationDT').dataTable({
        ajax: "get_all_employees",
        columnDefs: [{
            'targets': 0,
            'searchable':false,
            'orderable':false,
            'width':'1%',
            'className': 'dt-body-center',
            'render': function (data, type, full, meta){
                return '<input type="checkbox">';
            }
        }],
        columns:[
            { data: "id"},
            { data: "name" },
            { data: "surname" },
            { data: "position" },
            { data: "employment_length" },
            { data: "past_projects" }
        ],
        order: [1, 'asc'],
        rowCallback: function(row, data, dataIndex){
            // Get row ID
            var rowId = data[0];

            // If row ID is in the list of selected row IDs
            if($.inArray(rowId, rows_selected) !== -1){
                $(row).find('input[type="checkbox"]').prop('checked', true);
                $(row).addClass('selected');
            }
        }

    });

    TableManageButtons.init();
    var table = $('#EmployeeTrainingAllocationDT').DataTable();

    /*TODO add variable*/
    let emp_selected_ids=[];
    let count=0;
    // Handle click on checkbox
    $('#EmployeeTrainingAllocationDT').on('click', 'input[type="checkbox"]', function(e){



        let $row = $(this).closest('tr');
        //Alert for employee data

        let data = table.row($row).data();


        if(this.checked){
            $row.addClass('selected');
            emp_selected_ids[count]=data._id;
            count++;
        } else {
            $row.removeClass('selected');
            count--;
            emp_selected_ids.length--;

        }


        // Update state of "Select all" control
        // updateDataTableSelectAllCtrl(table);

        // Prevent click event from propagating to parent
        e.stopPropagation();
    });

    $('#EmployeeTrainingAllocationDT').on('click', 'tbody td, thead th:first-child', function(e){
        $(this).parent().find('input[type="checkbox"]').trigger('click');
    });

    $('#addTraining').on('click',function (e) {
        e.preventDefault();

        $.post("add_training",
            {
                trainer_name: $("#trainerName").val(),
                trainer_email: $("#trainerEmail").val(),
                trainer_contact: $("#trainerPhoneNumber").val(),
                start_date:$("#startDate").val(),
                end_date:$("#endDate").val(),
                emp_ids:JSON.stringify(emp_selected_ids)
            },
            function(data, status){
                alert("Data: " + data + "\nStatus: " + status);
            });
    });

});
/*$(window).load(function () {
 init_EmployeeTrainingAllocationDT();
 });*/


/*unction init_EmployeeTrainingAllocationDT() {

 }*/

//let table = $('#EmployeeTrainingAllocationDT').dataTable();
