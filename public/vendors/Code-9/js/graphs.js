/**
 * Page:
 * Functionality:
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Joshua Moodley
 * Date Revised: 05/10/2017 by Joshua Moodley
 */
function newDate(yyyy, mm, dd)
{
    return new Date(yyyy, mm, dd);
}

window.onload = function()
{

    /**
     *    index_dashboard.ejs progress graph
     *    Date Revised: 05/10/2017 by Joshua Moodley
     *    Date Revised: 10/10/2017 by Joshua Moodley
     */
    // $.get("/analytics", function (data, status) {
    //     let pc = document.getElementById('progressBarGraph').getContext('2d');
    //     let myChart = new Chart(pc, {
    //         type: 'bar',
    //         data: {
    //             labels: ["Completed", "Uncompleted"],
    //             datasets: [{
    //                 label: '# of Tasks',
    //                 data: [12, 19],
    //                 backgroundColor: [
    //                     'rgba(75, 192, 192, 0.2)', // GREEN
    //                     'rgba(255, 99, 132, 0.2)', // RED
    //
    //                     // 'rgba(54, 162, 235, 0.2)', // BLUE
    //                     // 'rgba(255, 206, 86, 0.2)', // YELLOW
    //                     // 'rgba(153, 102, 255, 0.2)', // PURPLE
    //                     // 'rgba(255, 159, 64, 0.2)' // Orange
    //                 ],
    //                 borderColor: [
    //                     'rgba(75, 192, 192, 1)',
    //                     'rgba(255,99,132,1)',
    //                     //
    //                     // 'rgba(54, 162, 235, 1)',
    //                     // 'rgba(255, 206, 86, 1)',
    //                     // 'rgba(153, 102, 255, 1)',
    //                     // 'rgba(255, 159, 64, 1)'
    //                 ],
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 yAxes: [{
    //                     ticks: {
    //                         beginAtZero:true
    //                     }
    //                 }]
    //             },
    //             title: {
    //                 display: true,
    //                 text: 'Overall Project Progress Based On Tasks Completed To Tasks Uncompleted'
    //             }
    //         }
    //     });
    // });


    /**
     *    director_dashboard.ejs analytics graph
     *    Date Revised: 05/10/2017 by Joshua Moodley
     *    Date Revised: 05/10/2017 by Jacques
     */

    defaultBackgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ] ;

    defaultBorderColor = [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ] ;

    $.get("/analytics", function (data, status) {
        if (data != null) {
            document.getElementById("analytics_graphs").innerHTML = "";
            let space = "";
            for (let x = 0; x < data.length; x++) {
                if (x % 2 == 0) {
                    space += "<div class=\"row\">";
                    space += "<div class=\"col-md-12 col-sm-12 col-xs-12\">";
                }

                space += "<div class=\"col-md-6 col-sm-6 col-xs-12\">";
                space += "<div class=\"x_panel\">";
                space += "<div class=\"x_title\">";
                space += "<h2>Manager: " + data[x].manager_name + "<small></small></h2>";
                space += "<ul class=\"nav navbar-right panel_toolbox\">";
                space += "<li style=\"float: right\"><a class=\"collapse-link\"><i class=\"fa fa-chevron-up\"></i></a>";
                space += "</li>";
                space += "</ul>";
                space += "<div class=\"clearfix\"></div>";
                space += "</div>";
                space += "<div class=\"x_content\">";
                space += "<canvas id=\"analytics" + String(x) + "\"></canvas>";
                space += "</div>";
                space += "</div>";
                space += "</div>";

                if ((x + 1) % 2 == 0) {
                    space += "</div>";
                    space += "</div>";
                }
            }
            document.getElementById("analytics_graphs").innerHTML = space;

            for (let x = 0; x < data.length; x++) {
                let employees = [];
                let hours = [];
                let myBackground = [];
                let myBorder = [];
                for (let y = 0; y < data[x].employees_worked_with.length; y++) {
                    employees[y] = data[x].employees_worked_with[y].employee_name;
                    hours[y] = parseInt(data[x].employees_worked_with[y].hours_worked);
                    myBackground[y] = defaultBackgroundColor[y % defaultBackgroundColor.length];
                    myBorder[y] = defaultBorderColor[y % defaultBorderColor.length];
                }
                let configAnalyGraph = {
                    type: 'bar',
                    data: {
                        labels: employees,
                        datasets: [{
                            label: 'No. of hours worked ',
                            data: hours,
                            backgroundColor: myBackground,
                            borderColor: myBorder,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }, title: {
                            display: true,
                            text: 'Number of Hours That A Manager Worked With A Specific Employee'
                        }
                    }
                };

                let aOne = document.getElementById("analytics" + String(x)).getContext('2d');
                let chartTwo = new Chart(aOne, configAnalyGraph);
            }
        }
    });

};
