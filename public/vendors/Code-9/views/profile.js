/**
 * Created by Seonin David on 2017/09/02.
 */
//user get_emp route
//checkout routes/employee/employee-profile.js

$(document).ready(function() {
   // alert("yeeet");
    let proj_id;

    $.get("get_emp", {id: "test"},
        function (data, status) {
           // alert(JSON.stringify(data));
            $.each(data, function (key, value) {
            //  alert(value["name"]);

              $('#empName').empty()
                  .append(value["name"]+" ")
                  .append(value["surname"]);

                $('#empPhoneNum').append(value["contact"]);

                $('#empRole').append(value["role"]);

                $('#empEmail').append(value["email"]);


            });
        });

    $.get("get_emp_milestone", {id: "test"},
        function (data, status) {
            //alert(JSON.stringify(data));
            $.each(data, function (key, mValue) {
                $("#empMilestones").append(
                "<li>"+
                    "<i class='fa fa-tasks'></i>"+
                        "<div class='message_date'>"+
                        "<h3 class='date text-info'>"+mValue.milestone_end_date+"</h3>"+
                        "</div>"+

                        "<div class='message_wrapper'>"+
                        "<h4 class='heading'>"+mValue.description+"</h4>"+
                    "<blockquote class='message'>"+
                        "<div class='profile_page_task_list'>"+
                        "<ul id='empTask' class='to_do'></ul>"+
                    "</div>"+
                    "</blockquote>"+
                    "</div>"+
                    "</li>"
                );
            });
        });

    $.get("get_emp_task", {id: "test"},
        function (data, status) {
            alert(JSON.stringify(data));

            $.each(data, function (key, value) {
                $('#empTask').append(
                "<li>"+
                "<p><span class='right task_date'><b>Due: </b>"+
                "<b class='t_date'>30/08/2017</b></span>"+
                "</p>"+
                "</li>"
                );
            });
        });




    $('#updateProfile').on('click', function (e) {
        alert(document.getElementById("pic").files[0].name);
//            $.get("store_image",
//                {
//                    pic:$("#pic").val()
//                }
//                ,
//                function(data, status) {
//
//
//
//                });

    });



});