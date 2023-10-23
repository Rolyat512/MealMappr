const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = $("#email-login").val().trim();
  const password = $("#password-login").val().trim();

  
  if (email && password) {
    // may need to adjust routes when further into the project for this
    const response = await fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/home"); // will send user to home screen after logging in
    } else {
      alert("Wrong email or password. Please try again.");
    }
  }
};

$("#login-form").on("submit", loginFormHandler);
