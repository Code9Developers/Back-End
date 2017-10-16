/**
 * Created by Seonin David on 2017/10/13.
 */
$.urlParam = function (name) {
    let  results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};
/**
 * Created by Seonin David on 2017/09/02.
 */


$(document).ready(function() {
    let proj_id;
    $.get("admin_display_image",{id:$.urlParam('id')},function (data,status) {

        if(data==","){
            //document.getElementById("pro_image").src = "/images/user.jpg" ;

        }
        else{
            document.getElementById("pro_image").src = "data:" + data[0] + ";base64," + data[1] ;
        }


    });
    $.get("admin_get_emp", {id:$.urlParam('id')},
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

    $.get("admin_get_emp_milestone", {id:$.urlParam('id')},
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

            });
            $.get("admin_get_emp_task",{id:$.urlParam('id')},
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

    $.get("admin_get_user_past_projects",{id:$.urlParam('id')},
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


});