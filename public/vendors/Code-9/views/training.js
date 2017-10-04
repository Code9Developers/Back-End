/**
 * Created by Seonin David on 2017/10/04.
 */

$(window).load(function () {
   init_EmployeeTrainingAllocationDT();
});
function init_EmployeeTrainingAllocationDT() {

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

    $EmployeeTrainingAllocationDT.on( 'click', 'tbody td:not(:first-child)', function (e)
    {
        this.inline( this );
    });

    $EmployeeTrainingAllocationDT.dataTable({
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
            { data: "past_projects" }
        ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        },

    });

    TableManageButtons.init();
}

$('#addTraining').on('click',function (e) {
    let  sendArr = [];
    let  c = 0;
    $('#EmployeeTrainingAllocationDT').find('input[type="checkbox"]:checked').each(function () {
        let ind = $(this).parent();//parent().parent().attr('id');
        // sendArr[c] = employeeArr[ind];
        // c++;
        window.alert(JSON.stringify(ind));
    });
    c = 0;
});