const withAuth = async (req, res, next) => {
    //If the user is not logged in, redirect the user to the login page
    if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
    }
    next();
    };
  
  
  module.exports = withAuth;