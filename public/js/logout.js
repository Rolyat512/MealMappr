const logout = async () => {
    const response = await fetch('/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/'); // welcome page
    } else {
      alert(response.statusText);
    }
  };
  
  $('#logout').on('click', logout);
  