const updateUser = $('#settings-form');
  updateUser.on('submit', async function(event) {
    event.preventDefault();

    const updateData = {
      name: $("#name").val(),
      email: $("#email").val(),
      password: $("#password").val(),
    };

    try {
      const response = await fetch(`/users/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData)
      });  
      // If the meal was successfully updated, the new meal is updated on the event and the modal is closed and sent back to /home
      if (response.ok) {
        console.log(updateData);
        alert("Your information has been successfully updated!")
        const update = await response.json();
        console.log(update)
        document.location.replace('/home');
      } else {
        alert("Error. Failed to update user information.");
      }      
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  });

  const deleteUser = $('#deleteUser');
  deleteUser.on('click', async () => {
    const response = await fetch('users/settings', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
  });
  if(response.ok) {
    alert("Your account has been deleted successfully.")
      document.location.replace('/signup');
  } else {
    alert("Delete account unsuccessful.  Please try again.")
  }
  })