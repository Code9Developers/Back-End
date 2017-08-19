/**
 * Created by Nicaedin on 08/17/2017.
 */

$(document).ready(function() {
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    $.get("get_milestones",{id:$.urlParam('id')},
        function(data, status){
        window.alert(data);
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

