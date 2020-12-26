var express = require("express");
const { response } = require("../app");
var router = express.Router();
var user = require("../controllers/user");

router.get("/", function (req, res) {
  let ifSession = req.session.name;
  if (ifSession) {
    res.render("home",{userName:ifSession});
  } else {
    res.render("login");
  }
});
router.get("/signup", (req, res) => {
  let ifSession = req.session.name;
  if (ifSession) {
    res.render("home",{userName:ifSession});
  } else {
    res.render("signup");
  }
});
router.get("/home", (req, res) => {
  let ifSession = req.session.name;
  if (ifSession) {
    res.render("home",{userName:ifSession});
  } else {
    res.render("login");
  }
});

router.post("/login", (req, res) => {
  let ifSession = req.session.name;
  if (ifSession) {
    res.render("home",{userName:ifSession});
  } else {
    user
      .userLogin(req.body)
      .then((response) => {
        req.session.name = response.user.name;
        res.send({ user: true });
      })
      .catch((response) => {
        res.send({ user: false });
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
