/**
 * Created by Seonin David on 2017/09/02.
 */
//user get_emp route
//checkout routes/employee/employee-profile.js



$(document).ready(function() {
    let proj_id;
    $.get("display_image",{},function (data,status) {
        if(data==","){
            //document.getElementById("pro_image").src = "/images/user.jpg" ;

        }
        else{
            document.getElementById("pro_image").src = "data:" + data[0] + ";base64," + data[1] ;
        }
    });
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
            let c = 1;
            $.each(data, function (key, value) {
                //  alert(value["name"]);
                let  tempDateArray=(value._id.project_start_date.substr(0,10)).split("-");
                let  start_date=(tempDateArray[2]+"/"+tempDateArray[1]+"/"+tempDateArray[0]).toString();

                let  tempDateArray_end_date=(value._id.project_end_date.substr(0,10)).split("-");
                let  end_date=(tempDateArray_end_date[2]+"/"+tempDateArray_end_date[1]+"/"+tempDateArray_end_date[0]).toString();
                $("#emp_past_proj").append(
                    "<tr>"
                    +"<td>"+c+"</td>"
                    +"<td>"+value._id.name+"</td>"
                    +"<td>"+value._id.owner_name+"</td>"
                    +"<td class='hidden-phone'>"+start_date+"</td>"
                    +"<td class='hidden-phone'>"+end_date+"</td>"
                    +"</tr>"
                );
                $('.p .progress-bar').progressbar({display_text: 'fill'});
                c++;

            });
        });

    $('#updateImage').on('click', function (event) {

        let source = document.getElementById("dynamic").src ;

        let b64 = source.substring(source.indexOf("base64") + 7, source.length) ;

        let content = source.substring(source.indexOf("data") + 5, source.indexOf(";")) ;

        $.get("store_image",
            {
                picdata:b64,
                piccontent:content,
            }
            ,
            function(data, status) {
                $.get("display_image", {}, function(data, status) {

                    document.getElementById("pro_image").src = "data:" + data[0] + ";base64," + data[1] ;
                });

            });
    });

    $("#updatePassword").on('click',function () {
        //    //should check two passwords
        let Pword = $("#password").val();
        let ConfPword = $("#confirm_password").val();

        if(Pword=="" || ConfPword==""){

            InvalidPassword();
            $("#confirm_password").empty();
            $("#password").empty()
        }
        else {
            if(Pword==ConfPword){
                $.get("update_password",{
                        pass:Pword
                    },
                    function (data, status) {
                        if(status=="success"){
                            passwords_changed();
                        }
                    });
            }
            else {
                passwords_invalaid();
                $("#confirm_password").empty();
                $("#password").empty()
            }
        }

    })

});