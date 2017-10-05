/**
 * Page:
 * Functionality:
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Joshua Moodley
 * Date Revised: 05/10/2017 by Joshua Moodley
 */
window.onload = function()
{
    let pc = document.getElementById('progressChart').getContext('2d');
    let xaxis = '["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6", "Task 7"]';

    let chart = new Chart(pc,
    {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data:
        {
            // x-axis
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets:
            [{
                label: "Task",
                backgroundColor: 'rgb(231, 234, 242)',
                borderColor: 'rgb(1, 31, 116)',
            // y-axis
                data: [0, 10, 5, 2, 20, 30, 45],
            }]
        }
    });
};