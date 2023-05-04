$(document).ready(function () {
    var calendar = $('#calendar');
    var calendar = new FullCalendar.Calendar(calendar[0], {
      initialView: 'timeGridWeek',
      // Add other options and event data here
      events: function(info, successCallback, failureCallback){
        let eventsArr = [
            {
                title: "Breakfast",
                date: "2023-05-03"
            }
        ]
        successCallback(eventsArr);
      },

      customButtons: {
        myCustomButton: {
          text: 'Add Event',
          click: function() {
            alert('clicked the custom button!');
          }
        }
      },

      headerToolbar: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
      }

    });
    calendar.render();
  });


