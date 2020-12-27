var express = require("express");
const { response } = require("../app");
var router = express.Router();
var user = require("../controllers/user");

router.get("/", function (req, res) {
  let role = req.session.role
  let ifSession = req.session.name;
  if (ifSession) {
    if(role===0){
      res.redirect('admin-home')
    }
    else{
    res.render("home",{userName:ifSession,roles:role});
    }
  } else {
    res.render("login");
  }
});
router.get("/login", function (req, res) {
  let role = req.session.role
  let ifSession = req.session.name;
  if (ifSession) {
    if(role===0){
      res.redirect('admin-home')
    }
    else{
    res.render("home",{userName:ifSession,roles:role});
    }
  } else {
    res.render("login");
  }
});
router.get("/signup", (req, res) => {
  let role = req.session.role
  let ifSession = req.session.name;
  if (ifSession) {
    if(role===0){
      res.redirect('admin-home')
    }
    else{
    res.render("home",{userName:ifSession,roles:role});
    }
  } else {
    res.render("signup");
  }
});
router.get("/home", (req, res) => {
  let role = req.session.role
  let ifSession = req.session.name;
  if (ifSession) {
    if(role===1){
    res.render("home",{userName:ifSession,roles:role});
    }
    else{
      res.redirect('admin-home')
    }
  } else {
    res.render("login");
  }
});

router.post("/login", (req, res) => {
  let ifSession = req.session.name;
  let role = req.session.role
  if (ifSession) {
    if(role===0){
      res.redirect('admin-home')
    }
    else{
    res.render("home",{userName:ifSession,roles:role});
    }
  } else {
    user
      .userLogin(req.body)
      .then((response) => {
        req.session.name = response.user.name;
        req.session.role = response.user.role
        res.send({ user: true,roles:role });
      })
      .catch((response) => {
        res.send({ user: false,roles:role });
      });
  }
});

router.post("/signup", (req, res) => {
  user.emailExist(req.body).then((data)=>{
    if(data){
      res.send({user:false})
    }
  }).catch(()=>{
    user.userSignup(req.body).then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
     res.send({user:true})
  })
});

// logout

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
module.exports = router;
