const dbs = require('.././database/dbs.js');

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

    let configProgressGraph = {
        type: 'line',
        data: {
            labels: [newDate(2017, 1, 1), newDate(2017, 1, 2), newDate(2017, 1, 3), newDate(2017, 1, 4), newDate(2017, 1, 5), newDate(2017, 1, 6)],
            datasets: [{
                label: "My First dataset",
                data: [0, 20, 30, 45, 50, 55],
            }]
        }
    };

    let pc = document.getElementById('progressChart').getContext('2d');
    let chartOne = new Chart(pc, configProgressGraph);

    /**
     *    director_dashboard.ejs analytics graph
     *    Date Revised: 05/10/2017 by Joshua Moodley
     *    Date Revised: 05/10/2017 by
     */

    let configAnalyGraph = {
        type: 'bar',
        data: [20, 10]
    };

    let aOne = document.getElementById('analyticsOne').getContext('2d');
    let chartTwo = new Chart(aOne, configAnalyGraph);

};