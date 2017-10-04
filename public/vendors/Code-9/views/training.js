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
                data: "<tr><div class=\"text-center\"><input name=\"\" type=\"checkbox\" id=\"check-all\" class=\"check_box\"></div></tr>",
                defaultContent: '<tr><div class="text-center"><input name="" type="checkbox" id="check-all" class="check_box"></div></tr>',
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

// $('#addTraining').on('click',function (e) {
//     //e.preventDefault();
//     // window.alert(table.columns(0).checkboxs.selected());
//     // var rows_selected = table.column(0).checkboxes.selected();
//     // $.each(rows_selected, function(index, rowId){
//     //     // Create a hidden element
//     //   window.alert(rowId);
//     // });
//     alert("hello")
//
//
// });

// $('#addTraining').click(function(){
//     var values = $("#EmployeeTrainingAllocationDT table input[name='sport']:checked").map(function() {
//         row = $(this).closest("tr");
//         return {
//             checkbox_id : $(this).val(),
//             hidden_id   : $(row).find("input[name=id]").val(),
//             address     : $(row).find("input[name=address]").val(),
//             radio       : $(row).find('input[type=radio]:checked').val() || "not selected"
//         }
//     }).get();
//     window.alert(values);
// });

$("#addTraining").click(function(){
    var table = $('#EmployeeTrainingAllocationDT').DataTable();

    var data = table
        .rows()
        .data();
    var count=0;
    $.each($("input[class='check_box']"), function() {
        $(this).attr("id", data[count]._id);
        count++;
    });
    var favorite = [];

    $.each($("input[class='check_box']:checked"), function(){

        alert("hello");
        alert($(this).attr("id"));

    });

    // alert("My favourite sports are: " + favorite.join(", "));

});