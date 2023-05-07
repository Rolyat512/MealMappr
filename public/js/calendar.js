//const { response } = require("express");

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
    events: async (info, successCallback, failureCallback) => {
      try {
        //fetch meals from server and format it to a FullCalendar event format
        const response = await fetch("/users/meals", {
          method: "GET",
        });
        if (response.status === 200) {
          const events = await response.json();
          // console.log(events)
          const formattedEvents = events.map((meal) => ({
            title: meal.mealType,
            id: meal.id,
            start: meal.date,
            end: meal.date,
          }));
          successCallback(formattedEvents);
        } else {
          failureCallback("Failed to fetch events");
        }
      } catch (err) {
        failureCallback("Error fetching events: " + err);
      };
    },
    eventClick: async function(info) {

      info.jsEvent.preventDefault();

      const mealID = info.event._def.publicId // grabs meal ID as 'publicId' from info.event._def given above in id: meal.id
      console.log(mealID);

      // route to the modal 
      const response = await fetch(`/users/meals/${mealID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });  
      if (response.ok) {
        document.location.replace(`/users/meals/${mealID}`);
      } else {
        alert("Error. Please try again.");
      }

    },
    
    // This function runs when a date is clicked, sets the date value in the modal, and displays the modal
    dateClick: function (info) {
      const openModal = document.getElementById("myModal");
      const hiddenDate = document.getElementById("date");
      hiddenDate.value = info.dateStr; // set the value of the hidden field to the clicked date
      openModal.classList.remove("hidden"); // removes hidden modal
    },
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,list",
    }
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

  // This code block will close the modal that allows user to review their meal NEED to make a fetch call
  const modalReview = $("#modalReview");
  const closeReview = $("#closeReview");
  closeReview.on("click", () => {
    modalReview.addClass("hidden");
    document.location.replace('/home');
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
        console.log(newEvent)
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



  // update the data in the modal/meal
  const formReview = $('#meal-review');
  formReview.on('submit', async function(event) {
    event.preventDefault();

    const id = document.querySelector('input[name="reviewDate"]').value; // brackets drill down into input attributes
    console.log(id);

    const reviewData = {
      mealType: $("#review-mealtype").val(),
      foodTitle: $("#reviewFoodTitle").val(),
      itemDescription: $("#reviewItemDescription").val(),
      proteinValue: $("#reviewProteinValue").val(),
      Calories: $("#reviewCalories").val(),
      Carbs: $("#reviewCarbs").val(),
    };

    try {
      const response = await fetch(`/users/meals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData)
      });  
      // If the meal was successfully updated, the new meal is updated on the event and the modal is closed and sent back to /home
      if (response.ok) {
        console.log(reviewData);
        alert("Your meal has been successfully updated!")
        const reviewEvent = await response.json();
        console.log(reviewEvent)
        document.location.replace('/home');
      } else {
        alert("Error. Failed to update meal.");
      }      
    } catch (error) {
      console.error("Error updating meal:", error);
    }
  });

  const deleteMeal = async (event) => {
    event.preventDefault();
    const deleteId = document.querySelector('input[name="reviewDate"]').value; // brackets drill down into input attributes
    console.log(deleteId);
  
    const response = await fetch(`/users/meals/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
      alert("Your meal has been deleted successfully.")
        document.location.replace('/home');
    } else {
      alert("Delete unsuccessful.  Please try again.")
    }
  };
  const removeMeal = $('#deleteMeal');
  removeMeal.on('click', deleteMeal);
  
});


