/**
 * Created by Seonin David on 2017/10/11.
 */

$("#login_btn").on('click',function (e) {
    e.preventDefault();
    $.post("login",{username:$("#username").val(),password:$("#password").val()},function (data,status) {
        if(data=='no_user'){
            IncorrectLogin();
            $("#username").empty();
            $("#password").empty();

        }
        else{
            $( location ).attr("href", data);
        }

    });
});