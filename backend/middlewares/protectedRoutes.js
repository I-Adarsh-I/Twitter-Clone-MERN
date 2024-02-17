var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
var express = require("express");
var userModel = require("../models/user_model");
var { SECRET_KEY } = require("../config");

const app = express();
app.use(express.json());
app.use(cookieParser());

const protectedRoutes = async (req, res, next) => {
  const token = req.cookies["User token"];

  if (!token) {
    res.status(401).json({ error: "Login session expired" });
  } else {
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) {
        res.status(401).json({ error: "Token invalid" });
      } else {
        const { _id } = payload;
        console.log("payload is: ", payload);
        userModel
          .findById(_id)
          .then((dbUser) => {
            console.log("Authenticated user:", dbUser); // Log the authenticated user
            req.user = dbUser;
            next();
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
          });
      }
    });
  }
};

module.exports = protectedRoutes;
