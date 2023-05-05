$(document).ready(function () {
    var calendarEl = $('#calendar');
    var calendar = new FullCalendar.Calendar(calendarEl[0], {
      initialView: 'dayGridMonth',

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

    //   customButtons: {
    //     myCustomButton: {
    //       text: 'Add Meal',
    //       click: function() {
    //         alert('clicked the custom button!');
    //       }
    //     }
    //   },
      dateClick: function (info) {
        const openModal = document.getElementById('myModal')
        console.log(info)
        openModal.classList.remove('hidden') // removes hidden modal
        
      
      },
      headerToolbar: {
        // left: 'prev,next today myCustomButton',
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
      }

    });
    calendar.render();


    document.querySelector('style').textContent += "@media screen and (max-width:767px) { .fc-toolbar.fc-header-toolbar {flex-direction:column;} .fc-toolbar-chunk { display: table-row; text-align:center; padding:5px 0; } }";
  });
