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
  let ifSession = req.session.name;
  if (ifSession) {
    let userid = req.params.id;
    adminController.deleteUserById(userid).then((data) => {
      res.redirect("/admin-home");
    });
  } else {
    res.render("login");
  }
});

router.get("/edit/:id", async (req, res) => {
  let ifSession = req.session.name;
  if (ifSession) {
    let result = await adminController
      .getUserById(req.params.id)
      .then((user) => {
        res.render("edit-user", { user });
      });
  } else {
    res.render("login");
  }
});
router.post("/edituser/:id", (req, res) => {
  let ifSession = req.session.name;
  if (ifSession) {
    adminController.updateUserId(req.params.id, req.body).then(() => {
      res.redirect("/admin-home");
    });
  } else {
    res.render("login");
  }
});

router.post("/createuser", (req, res) => {
  let ifSession = req.session.name;
  if (ifSession) {
    user
      .emailExist(req.body)
      .then((data) => {
        if (data) {
          res.send({ user: false });
        }
      })
      .catch(async () => {
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
  } else {
    res.render("login");
  }
});
router.get("/newUser", (req, res) => {
  let ifSession = req.session.name;
  if (ifSession) {
    res.render("create-user");
  } else {
    res.render("login");
  }
});
router.post("/searchByName", (req, res) => {
  let ifSession = req.session.name;
  if (ifSession) {
    adminController
      .SearchUser(req.body.name)
      .then((datas) => {
        if(datas){
        res.render("search", { userName: ifSession, datas });
        }else{
          res.render("searchuser");
        }
      })
      .catch((err) => {
        if(err){
        res.render("searchuser");
        }
      });
  } else {
    res.render("login");
  }
});
module.exports = router;
