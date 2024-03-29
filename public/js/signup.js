const signupFormHandler = async (event) => {
  event.preventDefault();
  const name = $("#name-signup").val().trim();
  const email = $("#email-signup").val().trim();
  const password = $("#password-signup").val().trim();
  const confirmpassword = $("#confirmpassword-signup").val().trim();

  if (name && email && password && confirmpassword) {
    if (password !== confirmpassword) {
      alert("Passwords don't match. Try again.");
      return;
    }
    if (password.length < 8) {
      alert("Please enter a password 8 characters or longer");
      return
    } else {
      const response = await fetch("/users/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/home");
      } else {
        alert("Page not redirected, please try again");
      }
    }
  } else {
    alert("Something went wrong, please try again");
  }
};
$("#signup-form").on("submit", signupFormHandler);
