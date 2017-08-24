/**
 * Created by Nicaedin on 08/22/2017.
 */
window.eve = [];
function getCalendarEvents() {
var item;
    $.get("calendar_events",
        {},
        function (data, status) {

            $.each(data, function (key, value) {
                // window.alert(value.name);

                item = {};
                item["title"] = value.name;
                item["start"] = value.project_start_date.substr(0,10);
                item["end"] = value.project_end_date.substr(0,10);
                item["url"] = "https://localhost:4000/user_project_detail?id="+value._id;

                eve.push(item);

            });

            // eve[eve.length - 1] = ']';
            //window.alert(eve[eve.length - 1]);
            init_calendar();

            // window.alert(eve.length);
        });

}


function  init_calendar() {
           if( typeof ($.fn.fullCalendar) === 'undefined'){ return; }
console.log('init_calendar');
// nEv = JSON.stringify();

// window.alert(JSON.parse(eve));
var date = new Date(),
    d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear(),
    started,
    categoryClass;

var calendar = $('#calendar').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
    },
    selectable: true,
    selectHelper: true,
    select: function(start, end, allDay) {
        $('#fc_create').click();

        started = start;
        ended = end;

        $(".antosubmit").on("click", function() {
            var title = $("#title").val();
            if (end) {
                ended = end;
            }

            categoryClass = $("#event_type").val();

            if (title) {

                calendar.fullCalendar('renderEvent', {
                        title: title,
                        start: started,
                        end: end,
                        allDay: allDay
                    },
                    true // make the event "stick"
                );
            }

            $('#title').val('');

            calendar.fullCalendar('unselect');

            $('.antoclose').click();

            return false;
        });
    },
    eventClick: function(calEvent, jsEvent, view) {
        $('#fc_edit').click();
        $('#title2').val(calEvent.title);

        categoryClass = $("#event_type").val();

        $(".antosubmit2").on("click", function() {
            calEvent.title = $("#title2").val();

            calendar.fullCalendar('updateEvent', calEvent);
            $('.antoclose2').click();
        });

        calendar.fullCalendar('unselect');
    },
    editable: false,
    events: eve
});

}


$(document).ready(function() {

    getCalendarEvents();

});