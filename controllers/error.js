// DISPLAY => ERROR 404 PAGE (CLIENT)
exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn,
  });
};

// DISPLAY => ERROR 500 PAGE (SERVER)
exports.get500 = (req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
};
