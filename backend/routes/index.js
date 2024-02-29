var express = require("express");
const {
  signUpHandler,
  loginHandler,
  logoutHandler,
  followHandler,
  unFollowHandler,
  getAllUserDetails,
} = require("../controllers/user");
const protectedRoutes = require("../middlewares/protectedRoutes");
var router = express.Router();

router.post("/signup", signUpHandler);
router.post("/login", loginHandler);
router.get("/profile", protectedRoutes, (req, res) => {
  res.status(200).json({ message: "User logged in" });
});
router.post("/logout", logoutHandler);
router.put("/follow", protectedRoutes, followHandler);
router.put("/:id/unfollow", protectedRoutes, unFollowHandler);
router.get('/user/:id', protectedRoutes, getAllUserDetails)

module.exports = router;
