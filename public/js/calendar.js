$(document).ready(function () {
    var calendar = $('#calendar');
    var calendar = new FullCalendar.Calendar(calendar[0], {
      initialView: 'dayGridMonth',
      // Add other options and event data here
    });
    calendar.render();
  });

  
