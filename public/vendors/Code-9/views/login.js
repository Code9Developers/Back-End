/**
 * Created by Seonin David on 2017/10/11.
 */

$("#login_btn").on('click',function (e) {
    e.preventDefault();
    var states = ["error","success"],
        curState = 0;

    curState ? curState = 0 : curState = 1;

    that = $(this);

    $.post("login",{username:$("#username").val(),password:$("#password").val()},function (data,status) {
        if(data=='no_user'){
            IncorrectLogin();
            $("#username").empty();
            $("#password").empty();

        }
        else{

                if ( that.hasClass("success") )
                {
                    that.removeClass("success");
                }

                else if ( that.hasClass("error") )
                {
                    that.removeClass("error");
                }

                else
                {
                    that.addClass("loading");
                    that.empty();

                    window.setTimeout(function() {

                        correctLogin();
                        that.removeClass("loading").addClass( states[ curState ] );
                        $( location ).attr("href", data);

                    }, 4000);
                }



        }

    });
});