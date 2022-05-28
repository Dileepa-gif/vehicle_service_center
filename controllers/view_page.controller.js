exports.home = (req, res) => {
  const flash_body = req.flash('flash_body');
  if(flash_body.length>0){
    res.render("home", { title: "Home Page", ...flash_body[0] });
  }else{
    res.render("home", { title: "Home Page" });
  }
};


exports.login_page = (req, res) => {

  const flash_body = req.flash('flash_body');
  if(flash_body.length>0){
    res.render("login_page", { layout:'./layouts/full-page', title: "Login Page", ...flash_body[0] });
  }else{
    res.render("login_page", { layout:'./layouts/full-page', title: "Login Page" });
  }
};
