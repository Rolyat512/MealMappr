$(document).ready(function () {
    var calendar = $('#calendar');
    var calendar = new FullCalendar.Calendar(calendar[0], {
      initialView: 'timeGridWeek',

      initialDate: new Date(),
      navLinks: true,
      editable: true,
      selectable: true,
      // Add other options and event data here
      events: function(info, successCallback, failureCallback){
        let eventsArr = [
            {
                title: "Breakfast",
                start: "2023-05-03T10:00:00",
                end: "2023-05-03T11:00:00",
                color: "green"
            },
            {
                title: "Lunch",
                start: "2023-05-03T13:00:00",
                end: "2023-05-03T14:00:00",
                color: "blue"
            },
            {
                title: "Dinner",
                start: "2023-05-03T19:00:00",
                end: "2023-05-03T20:00:00",
                color: "purple"
            },
            {
                title: "Snack",
                start: "2023-05-03T16:00:00",
                end: "2023-05-03T17:00:00",
                color: "red"
            }
        ]
        successCallback(eventsArr);
      },

      customButtons: {
        myCustomButton: {
          text: 'Add Meal',
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


