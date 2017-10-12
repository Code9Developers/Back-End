/**
 * Created by Seonin David on 2017/10/11.
 */
/**
 * Page: N/A
 * Functionality: Manager Calendar
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Nicaedin Suklal
 * Date Revised: 11/10/2017 by Nicaedin Suklal
 */


window.eve = [];
function getCalendarEvents() {
    let  item;

    let get1 = $.get("all_projects",
        {},
        function (data, status) {

            $.each(data, function (key, value) {

                item = {};
                item["id"] = value._id;
                item["title"] = value.name;
                item["start"] = value.project_start_date.substr(0,10);
                item["end"] = value.project_end_date.substr(0,10);
                item["url"] = "https://localhost:4000/user_project_detail?id="+value._id;

                eve.push(item);

            });

            //init_calendar();

        });

    let get2 = $.get("get_all_event_data",{}
        ,function(data,status){

            $.each(data, function (key, value) {


                item = {};
                item["id"] = value._id;
                item["title"] = value.description;
                item["start"] = value.event_start_date.substr(0,10);
                item["end"] = value.event_end_date.substr(0,10);
                item["url"] = "#";

                eve.push(item);

            });
        });

    $.when(get1,get2).done(function() {
        init_calendar()
    });

}


function  init_calendar() {
    if( typeof ($.fn.fullCalendar) === 'undefined'){ return; }
    console.log('init_calendar');

    let  date = new Date(),
        d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear(),
        started,
        categoryClass;

    let  calendar = $('#calendar').fullCalendar({
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

            for(var i =0; i < eve.size;i++){
                if(eve[i]["start"] <= start.format()){

                }
            }

            $(".antosubmit").on("click", function() {

                let  title = $("#title").val();
                if (end) {
                    ended = end;
                }



                categoryClass = $("#event_type").val();

                if (title) {

                    $.get("store_event",{
                        description:title,
                        start_date:start.format(),
                        end_date:end.format()
                    });

                    calendar.fullCalendar('renderEvent', {
                            id:title,
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
            $('.modal-footer').append("<button type=\"button\" class=\"btn btn-primary delSub\">Delete Event</button>");
            categoryClass = $("#event_type").val();

            $(".antosubmit2").on("click", function() {
                calEvent.title = $("#title2").val();

                calendar.fullCalendar('updateEvent', calEvent);
                $('.antoclose2').click();
            });

            $(".delSub").on("click", function() {
                //calEvent.title = $("#title2").val();
                $.get("delete_event",{
                    event_id:calEvent.id
                });
                calendar.fullCalendar('removeEvents', calEvent.id);
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


    /**
     *  The route /get_all_event_data will return all the data for that user as an array of objects
     *
     *  The route /store_event
     *          requires the data that is send though to be named description,start_date,end_date
     *          don't test this function, just implement it because I still need to see how the date is stored
     *
     *  The route /delete_event
     *          only requires the event ID to be sent though, with the following name:event_id
     *
     */


});