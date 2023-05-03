const withAuth = async (req, res, next) => {
    //If the user is not logged in, redirect the user to the login page
    if (!req.session.logged_in) {
    res.redirect('/users/login'); // corrected route
    return;
    }
    next();
    };
  
  
  module.exports = withAuth;