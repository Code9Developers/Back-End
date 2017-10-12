/**
 * Created by Seonin David on 2017/10/09.
 */
/**
 * Created by Nicaedin on 2017/10/09.
 */

function make_graph() {
    $.get("/user_progress_analytics",function (data, status) {
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
$(document).ready(function() {
    make_graph();
    $.get("get_emp_task", {id: "test"},
        function (data, status) {
            //  alert(JSON.stringify(data));

            $.each(data, function (key, value) {

                $("#empTask").append(
                    "<li>"+
                    "<p>"+
                    mValue.description
                    +"</p>"+
                    "</li>"
                );


            });
        });

    $.get("get_emp_milestone", {id: "test"},
        function (data, status) {
            // alert(JSON.stringify(data));
            $.each(data, function (key, mValue) {
                $("#empMile").append(
                    "<li>"+
                    "<p>"+
                    mValue.description
                    +"</p>"+
                    "</li>"
                );

                /* mValue.tasks.forEach(function(curVal,ind,ini){
                 $('#'+mValue._id).append(
                 "<li>"+
                 "<p>"+curVal+"<span class='right task_date'><b>Due: </b>"+
                 "<b class='t_date'>30/08/2017</b></span>"+
                 "</p>"+
                 "</li>"
                 );

                 });*/

            });


        });

});
