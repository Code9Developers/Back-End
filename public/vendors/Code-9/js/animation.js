function alg_animate()
{
    var paper = Raphael("holder");
    //console.log("animation log : "+$('#skills').val().length);
    var counter = 0;
    var total = $('#skills').val().length;
    var angle = 90;
    if($('#skills').val().length>2)
    {
        angle = 360/($('#skills').val().length-1);
        console.log("calculated angle : "+angle);
    }
    var angle_add = 0;
    var origin_x = 200;
    var origin_y = 200;
    var radius = 100;
    var x_coord = origin_x;
    var y_coord = origin_y;
    var circle_size = 8;
    //Animations
    emp_found = Raphael.animation({fill: "#1b8d20", stroke: "none"});

    ripple_out = Raphael.animation({r: 15, stroke: "#20b426", "stroke-width": "3"}, 600, "linear",  function() { this.remove() }).repeat(10);
    ripple_fade = Raphael.animation({opacity: 0 }, 600);
    console.log("x : "+x_coord+" , y : "+y_coord);
    var new_circle = paper.circle(origin_x, origin_y, circle_size).attr({stroke: "#2A3F54", fill: "none", "stroke-width": "2"});
    var new_ripple = paper.circle(origin_x, origin_y, circle_size).attr({stroke: "none", fill: "none"},);
    new_ripple.attr({ opacity: 1 });
    new_circle.attr({ opacity: 0 });
    new_circle.animate({ opacity : 1}, 2000);
    new_circle.animate({transform: "r" + angle_add + "," + origin_x + "," + origin_y}, 2000);
    new_ripple.animate({transform: "r" + angle_add + "," + origin_x + "," + origin_y}, 2000);

    var timer = Math.floor(Math.random()*(($('#skills').val().length*1000)/2-3000+1)+3000);
    new_circle.animate(emp_found.delay(timer));
    new_ripple.animate(ripple_out.delay(timer));
    new_ripple.animate(ripple_fade.delay(timer));
    for (var loop = 0; loop < ($('#skills').val().length-1); loop++)
    {
        angle_add-=angle;
        console.log("angle is : "+angle);
        new_circle = paper.circle(origin_x+100, origin_y, circle_size).attr({stroke: "#2A3F54", fill: "none", "stroke-width": "2"});
        new_ripple = paper.circle(origin_x+100, origin_y, circle_size).attr({stroke: "none", fill: "none"});
        new_ripple.attr({ opacity: 1 });
        new_circle.attr({ opacity: 0 });
        new_circle.animate({ opacity : 1}, 2000);
        new_circle.animate({transform: "r" + angle_add + "," + origin_x + "," + origin_y}, 2000);
        new_ripple.animate({transform: "r" + angle_add + "," + origin_x + "," + origin_y}, 2000);

        timer = Math.floor(Math.random()*(($('#skills').val().length*1000)/2-2000+1)+2000);

        new_circle.animate(emp_found.delay(timer));
        new_ripple.animate(ripple_out.delay(timer));
        new_ripple.animate(ripple_fade.delay(timer));
        display(loop, timer);
    }
    if ($('#skills').val().length<=2)
    {
        timer = 0;
        display(0, timer);
    }

};

var display = function (loop, timer)
{
    if(timer == 0)
    {
        console.log("HELLO");
        setTimeout(function ()
        {
            $('#holder').hide();
            init_EmployeeAllocationDT();
            $('#demo-form').show();

        }, timer+2000);
    }
    else if(loop == ($('#skills').val().length-2))
    {
        console.log("NO HELLO");
        setTimeout(function ()
        {
            $('#holder').hide();
            init_EmployeeAllocationDT();
            $('#demo-form').show();

        }, timer+2000);
    }
    console.log("test");
};

var toRadians = function (degree) {
    return degree * (Math.PI / 180);
};