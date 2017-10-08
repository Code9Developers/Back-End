function alg_animate()
{
    //lets get the number of employers being assigned
    //var canvas = document.getElementById('holder');
    //var context = canvas.getContext("2d");
    //context.clearRect(0, 0, canvas.width, canvas.height);
    var paper = Raphael("holder");
    paper.canvas.style.backgroundColor = '#F00';
    console.log("animation log : "+$('#skills').val().length);
    var angle = 90;
    if($('#skills').val()>2)
    {
        angle = 360/($('#skills').val().length-1);
    }
    var angle_add = 0;
    var origin_x = 200;
    var origin_y = 200;
    var radius = 100;
    var x_coord = origin_x;
    var y_coord = origin_y;
    var circle_size = 8;
    //draw the starting circle
    console.log("x : "+x_coord+" , y : "+y_coord);
    paper.circle(origin_x, origin_y, circle_size).attr({stroke: "none", fill: "#011f74"});
    for (var loop = 0; loop < ($('#skills').val().length-1); loop++)
    {
        angle_add-=angle;
        console.log("angle is : "+angle);
        console.log("cos("+angle_add+") = "+Math.round(Math.cos(toRadians(angle_add))));
        console.log("sin("+angle_add+") = "+Math.round(Math.sin(toRadians(angle_add))));
        x_coord = origin_x+(radius*Math.cos(toRadians(angle_add)));
        y_coord = origin_y+(radius*Math.sin(toRadians(angle_add)));
        //for each skill, draw a circle at the given angle
        paper.circle(x_coord, y_coord, circle_size).attr({stroke: "none", fill: "#011f74"});
        console.log("x : "+x_coord+" , y : "+y_coord);
        //x = rcos@+x0
        //y = rsign@+y0
    }
        //run = document.getElementById("assignEmployees")
        /*set = r.set(
            r.circle(300, 200, 8), r.circle(200, 100, 8), r.circle(100, 200, 8), r.circle(200, 300, 8), r.circle(200, 200, 8)
        ).attr({
            stroke: "none",
            fill: "#011f74"
        });,
        c = r.circle(200, 200, 10).attr({stroke: "#73879e", "stroke-width": 4}),
        fade = function (id) {
            return function () {
                set[id].attr({fill: "#011f74", r: 12}).animate({fill: "#73879e", r: 8}, 500);
            };
        };

    run.onclick = function () {
        var ex = "bounce",
            ey = "elastic";

        c.stop().animate({
            "20%": {cy: 200, easing: ey, callback: fade(0)},
            "40%": {cy: 100, easing: ey, callback: fade(1)},
            "60%": {cy: 200, easing: ey, callback: fade(2)},
            "80%": {cy: 300, easing: ey, callback: fade(3)},
            "100%": {cy: 200, easing: ey, callback: fade(4)}
        }, 5000).animate({
            "20%": {cx: 300, easing: ex},
            "40%": {cx: 200, easing: ex},
            "60%": {cx: 100, easing: ex},
            "80%": {cx: 200, easing: ex},
            "100%": {cx: 200, easing: ex}
        }, 5000);
    };*/
};

var toRadians = function (degree) {
    return degree * (Math.PI / 180);
};