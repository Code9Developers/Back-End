/**
 * Created by Nicaedin on 2017/07/24.
 */

$(document).ready(function() {

    <!--This is where we add our own functions-->
    $('#assignEmployees').on('click', function (e) {
        e.preventDefault(); // disable the default form submit event
        $.get("test_algorithm",
            {
                num_empl: 5,
                skills: ["test", "test", "test"],
                duration: 2
            },function(data, status){
                console.log(data);
            });
        //window.alert("Employees Assigned");
    });

    $('#approveEmployee').on('click', function (e) {
        e.preventDefault(); // disable the default form submit event
        window.alert("Employee Improved");

    });

    $('#removeEmployee').on('click', function (e) {
        e.preventDefault(); // disable the default form submit event
        window.alert("Employee Removed");

    });

    $('#createProjectbtn').on('click', function (e) {
        e.preventDefault(); // disable the default form submit event
        window.alert("Project Created");

    });
});
