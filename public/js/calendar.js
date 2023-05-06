// This code block sets up the calendar, adds event data and options, and sets the header toolbar
$(document).ready(function () {
  var calendar = $("#calendar");
  var calendar = new FullCalendar.Calendar(calendar[0], {
    initialView: "dayGridMonth",
    initialDate: new Date(),
    navLinks: true,
    editable: true,
    selectable: true,
    // Add other options and event data here
    events: function (info, successCallback, failureCallback) {
      const fetchEvents = async () => {
        try {
          // Fetch meals from server and format them to FullCalendar event format
          const response = await fetch("/users/meals", {
            method: "GET",
          });
          if (response.status === 200) {
            const events = await response.json();
            const formattedEvents = events.map((meal) => ({
              title: meal.foodTitle,
              start: meal.date,
              end: meal.date,
            }));
            successCallback(formattedEvents);
          } else {
            failureCallback("Failed to fetch events");
          }
        } catch (error) {
          failureCallback("Error fetching events: " + error);
        }
      };

      fetchEvents();
    },
    // This function runs when a date is clicked, sets the date value in the modal, and displays the modal
    dateClick: function (info) {
      const openModal = document.getElementById("myModal");
      const hiddenDate = document.getElementById("date");
      hiddenDate.value = info.dateStr; // set the value of the hidden field to the clicked date
      console.log(info);
      openModal.classList.remove("hidden"); // removes hidden modal
    },
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,list",
    },
  });
  calendar.render();

  document.querySelector("style").textContent +=
    "@media screen and (max-width:767px) { .fc-toolbar.fc-header-toolbar {flex-direction:column;} .fc-toolbar-chunk { display: table-row; text-align:center; padding:5px 0; } }";

  // This code block sets up the behavior of the modal when it is closed
  const myModal = $("#myModal");
  const closeModal = $("#closeModal");
  closeModal.on("click", () => {
    myModal.addClass("hidden");
  });

  // This code block handles form submission when adding a meal and sends the form data to the server
  const addMealForm = $("#meal-form");
  addMealForm.on("submit", async function (event) {
    event.preventDefault();
    const formData = {
      date: $("#date").val(),
      mealType: $("#meal-type").val(),
      foodTitle: $("#foodTitle").val(),
      itemDescription: $("#itemDescription").val(),
      proteinValue: $("#proteinValue").val(),
      Calories: $("#Calories").val(),
      Carbs: $("#Carbs").val(),
    };
    try {
      const response = await fetch("/users/meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // If the meal was successfully added, the new event is added to the calendar and the modal is closed
      if (response.status === 200) {
        const newEvent = await response.json();
        calendar.addEvent(newEvent);
        myModal.addClass("hidden");
        location.reload();
      } else {
        throw new Error("Failed to add meal");
      }
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  });
});
