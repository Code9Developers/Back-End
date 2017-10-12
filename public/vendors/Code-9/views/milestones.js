/**
 * Page: N/A
 * Functionality: Milestones
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Nicaedin Suklal
 * Date Revised: 17/08/2017 by Nicaedin Suklal
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
$.urlParam = function(name){
    let  results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

function make_graph() {
    $.get("/progress_milestone_analytics",{id:$.urlParam('id')},function (data, status) {
        let pc = document.getElementById('milestonesprogressBarGraph').getContext('2d');
        let myChart = new Chart(pc, {
            type: 'bar',
            data: {
                labels: ["Completed", "Uncompleted"],
                datasets: [{
                    label: '# of Milestones',
                    data: data,
                    backgroundColor: [
                        //'rgba(75, 192, 192, 0.2)', // GREEN
                        //'rgba(255, 99, 132, 0.2)', // RED

                         'rgba(54, 162, 235, 0.2)', // BLUE
                        // 'rgba(255, 206, 86, 0.2)', // YELLOW
                         'rgba(153, 102, 255, 0.2)', // PURPLE
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
                    text: 'Overall Project Progress Based On Milestones Completed To Milestones Uncompleted'
                }
            }
        });
    });
}
$(document).ready(function() {
    $(".to_do").empty();
    make_graph();

    $.get("data_project_edit", {id: $.urlParam('id')},
        function (data, status) {
            $("#project-name").append(data.name);
        });



    $.get("get_milestones",{id:$.urlParam('id')},
        function(data, status){

            $(".to_do").empty();
            $.each(data, function (key, value) {
                $(".to_do").append(
                    " <li>"+
                    "<p>"+
                    value.description+
                    "</p>"+
                    "<small>Deadline: " +
                    (value.milestone_end_date).substr(0,10)+
                    "</small>"+
                    "</li>");
            });
    });

    $('#createMile').on('click', function (e) {
        $.get("store_milestones",
            {
                id:$.urlParam('id'),
                milestone_name: $('#milename').val(),
                end_date: $('#end_date_mile').val()
            },function(data, status){
                make_graph();
                $(".to_do").append(
                    " <li>"+
                    "<p>"+
                    $("#milename").val()+
                    "</p>"+
                    "<small>Deadline: " +
                    $('#end_date_mile').val()+
                    "</small>"+
                    "</li>");
            });
    });
});

