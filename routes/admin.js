const express = require("express");
const { ReplSet } = require("mongodb");
const router = express.Router();
const adminController = require("../controllers/admin");
const user = require("../controllers/user");

router.get("/admin-home", (req, res) => {
  let ifSession = req.session.name;
  if (ifSession) {
    adminController
      .getAllUsers()
      .then((data) => {
        console.log(data);
        res.render("admin-home", { userName: ifSession, data });
      })
      .catch((err) => {
        console.log("error in getting data" + err);
      });
  } else {
    res.redirect("/");
  }
});
router.get("/delete/:id", (req, res) => {
  let userid = req.params.id;
  adminController.deleteUserById(userid).then((data) => {
    res.redirect("/admin-home");
  });
});

router.get("/edit/:id", async (req, res) => {
  let result = await adminController.getUserById(req.params.id).then((user) => {
    res.render("edit-user", { user });
  });
});
router.post("/edituser/:id", (req, res) => {
  console.log(":working");
  console.log(req.body);
  adminController.updateUserId(req.params.id, req.body).then(() => {
    res.redirect("/admin-home");
  });
});

router.post("/createuser",(req, res) => {
  user
    .emailExist(req.body)
    .then((data) => {
      if (data) {
        res.send({ user: false });
      }
    })
    .catch(async() => {
       await user
        .userSignup(req.body)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      res.send({ user: true });
    });
});
router.get("/newUser", (req, res) => {
  let ifSession = req.session.name;
  if (ifSession) {
    res.render("create-user");
  } else {
    res.render("login");
  }
});
module.exports = router;
