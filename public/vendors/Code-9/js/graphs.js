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
     */

    // let configProgressGraph = {
    //     type: 'line',
    //     data: {
    //         labels: [newDate(2017, 1, 1), newDate(2017, 1, 2), newDate(2017, 1, 3), newDate(2017, 1, 4), newDate(2017, 1, 5), newDate(2017, 1, 6)],
    //         datasets: [{
    //             label: "My First dataset",
    //             data: [0, 20, 30, 45, 50, 55],
    //         }]
    //     }
    // };
    //
    // let pc = document.getElementById('progressChart').getContext('2d');
    // let chartOne = new Chart(pc, configProgressGraph);

    /**
     *    director_dashboard.ejs analytics graph
     *    Date Revised: 05/10/2017 by Joshua Moodley
     *    Date Revised: 05/10/2017 by
     */

    let configAnalyGraph = {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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
            }
        }
    };

    let aOne = document.getElementById('analyticsOne').getContext('2d');
    let chartTwo = new Chart(aOne, configAnalyGraph);

};