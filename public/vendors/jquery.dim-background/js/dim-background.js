/**
 * Created by Josh on 2017/04/21.
 */
$(document).ready(function()
{
    $(window).scroll(function ()
    {
        if ($(this).scrollTop() > 50)
        {
            $('#back-to-top').fadeIn();
        }
        else
        {
            // $('#back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#back-to-top').click(function ()
    {
        $('#back-to-top').tooltip('hide');
        $('body, html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // Contact Form Animation
    $(function()
    {
        // contact form animations
        $('#back-to-top').click(function()
        {
            $('#contactForm').fadeToggle();
            $("body").dimBackground();
        });

        $(document).mouseup(function (e)
        {
            var container = $("#contactForm");

            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                container.fadeOut();
                $("body").undim();
            }
        });
    });
});