/**
 * Created by Seonin David on 2017/09/02.
 */
//user get_emp route
//checkout routes/employee/employee-profile.js



$(document).ready(function() {
    let proj_id;

    $.get("get_emp", {},
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

                // alert(value["skill"]);
                $.each(value["skill"],function(key,value){
                    let rating=(parseFloat(value.rating)/parseInt(value.counter))*10;
                    $("#empSkill").append(
                        "<li>"+
                        "<p>"+value.name+"</p>"+
                        "<div class='progress progress-striped prog'>"+
                        "<div class='progress-bar' role='progressbar' data-transitiongoal='"+rating+"'></div>"+
                        "</div><br/>"+
                        "</li>"
                    );
                });

                $('.prog .progress-bar').progressbar({display_text: 'fill'});
            });
        });

    $.get("get_emp_milestone", {},
        function (data, status) {
            //    alert(JSON.stringify(data));
            $.each(data, function (key, mValue) {
                let  tempDateArray=(mValue.milestone_end_date.substr(0,10)).split("-");
                let  newDate=(tempDateArray[2]+"/"+tempDateArray[1]+"/"+tempDateArray[0]).toString();
                $("#empMilestones").append(
                    "<li>"+
                    "<i class='fa fa-tasks'></i>"+
                    "<div class='message_date'>"+
                    "<h3 class='date text-info'>"+newDate+"</h3>"+
                    "</div>"+

                    "<div class='message_wrapper'>"+
                    "<h4 class='heading'>"+mValue.description+"</h4>"+
                    "<blockquote class='message'>"+
                    "<div class='profile_page_task_list'>"+
                    "<ul id='"+mValue._id+"' class='to_do'></ul>"+
                    "</div>"+
                    "</blockquote>"+
                    "</div>"+
                    "</li>"
                );

                /* mValue.tasks.forEach(function(curVal,ind,ini){
                 $('#'+mValue._id).append(
                 "<li>"+
                 "<p>"+curVal+"<span class='right task_date'><b>Due: </b>"+
                 "<b class='t_date'>30/08/2017</b></span>"+
                 "</p>"+
                 "</li>"
                 );

                 });*/

            });
            $.get("get_emp_task",{},
                function (data, status) {
                    //  alert(JSON.stringify(data));

                    $.each(data, function (key, value) {
                        let des = "#"+value.milestone_id;

                        $(des).append(
                            "<li>"+
                            "<p>"+value.description+"<span class='right task_date'>"+
                            "</p>"+
                            "</li>"
                        );


                    });
                });

        });

    $.get("get_user_past_projects",{},
        function (data, status) {
            // alert(JSON.stringify(data));
            let c = 1;
            $.each(data, function (key, value) {
                //  alert(value["name"]);
                let  tempDateArray=(value._id.project_start_date.substr(0,10)).split("-");
                let  start_date=(tempDateArray[2]+"/"+tempDateArray[1]+"/"+tempDateArray[0]).toString();
                $("#emp_past_proj").append(
                    "<tr>"
                    +"<td>"+c+"</td>"
                    +"<td>"+value._id.name+"</td>"
                    +"<td>"+value._id.owner_name+"</td>"
                    +"<td class='hidden-phone'>"+start_date+"</td>"
                    +"<td class='vertical-align-mid'>"
                    +"<div class='p'>"
                    +"<div class='progress-bar' data-transitiongoal='35' aria-valuemin='-40' aria-valuemax='200'></div>"
                    +"</div>"
                    +"</td>"
                    +"</tr>"
                );
                $('.p .progress-bar').progressbar({display_text: 'fill'});
                c++;

            });
        });

    $('#updateProfile').on('click', function (e) {
        alert(document.getElementById("pic").files[0].name);
           $.get("store_image",
               {
                   pic:$("#pic").val()
               }
               ,
               function(data, status) {
                   $.get("display_image",{},function(data, status) {
                        alert(data);
                   });
               });


        //    //should check two passwords
        // let oldPword = $("#oldpassword").val()
        // let newPword = $("#newpassword").val()
        //
        // $.get("check_password",{
        //         oldP:oldPword
        //     },
        //     function (data, status) {
        //         if(data == true){
        //             $.get("change_password",{
        //                     oldP:oldPword,
        //                     newP:newPword
        //                 },
        //                 function (data, status) {
        //                     alert("Password Changed")
        //                 });
        //         }else{
        //             alert("Check Password")
        //         }
        //     });
    });



});