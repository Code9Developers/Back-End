/**
 * Created by Nicaedin on 2017/10/09.
 */
$(document).ready(function() {

    $.get("get_emp_task", {id: "test"},
        function (data, status) {
            //  alert(JSON.stringify(data));

            $.each(data, function (key, value) {

                $("#empTask").append(
                    "<li>"+
                    "<p>"+
                    mValue.description
                    +"</p>"+
                    "</li>"
                );


            });
        });

    $.get("get_emp_milestone", {id: "test"},
        function (data, status) {
           // alert(JSON.stringify(data));
            $.each(data, function (key, mValue) {
                $("#empMile").append(
                    "<li>"+
                    "<p>"+
                    mValue.description
                    +"</p>"+
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


        });

});
