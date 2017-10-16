/**
 * Page: N/A
 * Functionality: Project Review
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 26/09/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
/**
 * Created by Seonin David on 2017/09/26.
 */
$(document).ready(function() {

    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    };

    $.get("get_project_employees", {id: $.urlParam('id')}, function (data, status) {
        let user_data=data;
        $.each(user_data, function (key, value) {
            $.get("get_chosen_skills", {id: $.urlParam('id'),user_id:value._id.id}, function (data, status) {
                let fullname = value._id.name + " " + value._id.surname;
                $("#all_user_info").append(
                    "<div class='row'>"+
                    "<div class='col-md-6 col-sm-6 col-xs-12 profile_details'>" +
                    "<div class='well profile_view'>" +
                    "<div class='col-sm-12'>" +
                    "<h4 class='brief'><i>" + value._id.position + "</i></h4>" +
                    "<div class='left col-xs-7'>" +
                    "<h2>" + fullname + "</h2>" +
                    "<ul class='list-unstyled'>" +
                    "<li><i class='fa fa-building'></i>Email address: " + value._id.email + "</li>" +
                    "<br/>"+
                    "<li><i class='fa fa-phone'></i> Phone number:" + value._id.contact + " </li>" +
                    "</ul>" +
                    "</div>" +
                    "<div class='right col-xs-5 text-center'>" +
                    "<img src='images/user.png'' alt='' class='img-circle img-responsive'>" +
                    "</div>" +
                    "</div>"+
                    "</div>"+
                    "</div>"+
                    "<div class='col-md-offset-1 col-sm-offset-1 col-md-4 col-sm-4 col-xs-12'>"+
                    "<h5>Skill: "+data.name+"</h5>"+
                    "<label for="+key+">Rating:</label>"+
                    "<input type='text' id="+value._id.id+" class='skill_rating' name="+value._id.id+">"+
                    "</div>"+
                    "<div>"+
                    "<br/>"+
                    "<hr/>");
                var ref_id="#"+value._id.id;
                $(ref_id).ionRangeSlider({
                    type: "double",
                    min: 0,
                    max: 10,
                    from: 0,
                    to: 10,
                    from_fixed: true
                });
            });
        });

    });

    $( "#submit_review" ).on("click",function( event ) {
         ReviewSuccessful();
        // event.preventDefault();
        $.get("send_review", {data:$("form").serializeArray(),id:$.urlParam('id')},function (data, status) {
            $( location ).attr("href", data);
        });
    });

});