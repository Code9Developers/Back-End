/**
 * Created by Nicaedin on 08/17/2017.
 */

$(document).ready(function() {
    // <!--Dynamically check notifications-->

    var globEmployees = null;
    // $("#employeeTable").empty();


    $('#createMile').on('click', function (e) {
        e.preventDefault(); // disable the default form submit event
        $.get("store_milestones",
            {
                project_id: 1234,
                m_name: $('#milename').val(),
                end_date: $('#end_date_mile').val()
            },function(data, status){
                window.alert(data);
            });
    });

});

