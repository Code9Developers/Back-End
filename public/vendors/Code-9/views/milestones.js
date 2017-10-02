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

$(document).ready(function() {
    $(".to_do").empty();
    $.urlParam = function(name){
        let  results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    };

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

