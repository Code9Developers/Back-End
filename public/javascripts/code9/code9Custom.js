/**
 * Created by Nicaedin on 2017/07/24.
 */

$(document).ready(function() {

    <!--This is where we add our own functions-->
    $('#assignEmployees').on('click', function (e) {
        e.preventDefault(); // disable the default form submit event
        //window.alert("HELLO");
        $.get("test_algorithm", function(data, status){
            //alert("Data: " + data + "\nStatus: " + status);
            //window.alert("we have a response");
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
