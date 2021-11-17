const express = require("express");

require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const auth_router = express.Router();

auth_router.post("/api/sign_up", async (req, res) => {
  console.log("sign up stuff : ", req.body);
  try {
    const { firstName, lastName, email, password, image } = req.body;
    console.log(req.body);

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      console.log("$$$$$$$");
      res.status(400).send("All input is required").end();
    }

    //Encrypt user password
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      profile_pic: image,
      password: encryptedPassword,
    });
    newUser.save();

    // return ok status , user created !
    res.status(201).json("ok");
  } catch {
    res.status(500).send("Internal server error, please try again later");
  }
});

auth_router.post("/api/sign_in", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    console.log(email, password);
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    console.log("user found : ", user);

    if (user && bcrypt.compareSync(password, user.password)) {
      console.log("i am here");
      // Create token
      const token = jwt.sign(
        {
          firstName: user.firstName,
          email: user.email,
          profile_pic: user.profile_pic,
          is_admin: user.is_admin,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );
      console.log("token : ", token);
      // save user token
      user.token = token;
      console.log("user : ", user);

      // user

      res.status(200).cookie("jwt", token).send("ok");
    } else {
      res.status(401).send("Invalid Username or Password");
    }
  } catch (err) {
    console.log(err);
  }
});

auth_router.post("/api/facebook_sign_in", async (req, res) => {
  try {
    const { firstName, lastName, email, password, image } = req.body;
    console.log(req.body);

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });
    console.log("user found : ", user);

    if (user && bcrypt.compareSync(password, user.password)) {
      // if we found an exisitng user ...

      console.log("found exsisting user ...");
      // Create token
      const token = jwt.sign(
        {
          firstName: user.firstName,
          email: user.email,
          profile_pic: user.profile_pic,
          is_admin: user.is_admin,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );
      console.log("token : ", token);

      res.status(200).cookie("jwt", token).send("ok user exsisting");
    } else {
      // if we didnt found any exsisting user
      //create one and then send him to client
      console.log("no user found , creating one ...");
      //Encrypt user password
      const encryptedPassword = bcrypt.hashSync(password, 10);

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        profile_pic: image,
        password: encryptedPassword,
      });
      newUser.save();
      console.log("newUser : ", newUser);
      // Create token
      const token = jwt.sign(
        {
          firstName: newUser.firstName,
          email: newUser.email,
          profile_pic: newUser.profile_pic,
          is_admin: newUser.is_admin,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );
      console.log("tokennn : ", token);
      res.status(200).cookie("jwt", token).send("new user created");
    }
  } catch {
    res.status(401).send("Invalid Username or Password");
    // res.status(500).send("Internal server error, please try again later");
  }
});

module.exports = { auth_router };
