exports.home = (req, res) => {
  const flash_body = req.flash('flash_body');
  if(flash_body.length>0){
    res.render("home", { text: "This is EJS", title: "Home Page1", ...flash_body[0] });
  }else{
    res.render("home", { text: "This is EJS", title: "Home Page0" });
  }
  
};
