const express = require("express");

require("dotenv").config();
const User = require("../../models/User");

const user_router = express.Router();

user_router.get("/api/all_users", async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
});

user_router.post("/api/update_user", async (req, res) => {
  const { email, firstName, lastName, address, roll, phone, image } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        email,
        phone,
        address,
        roll,
        profile_pic: image,
      }
    );
    user.save();
    console.log("updated user : ", user);
    const all_users = await User.find({});
    res.status(200).send(all_users);
  } catch {
    res.status(500).send("something went wrong...");
  }
});

user_router.delete("/api/delete_user", async (req, res) => {
  console.log(" delete req ", req.body._id);

  User.findByIdAndRemove(req.body._id)
    .exec()
    .then(async (doc) => {
      console.log("doc", doc);
      if (!doc) {
        return res.status(404).send("errr deleting user");
      } else {
        const all_users = await User.find({});
        console.log("all_users : ", all_users);
        return res.status(200).send(all_users);
      }
    })
    .catch((err) => res.status(500).send(err));
});

user_router.post("/api/new_user", async (req, res) => {
  const { firstName, lastName, email, address, phone, roll, image } = req.body;

  try {
    const new_user = await User.create({
      firstName,
      lastName,
      email,
      address,
      phone,
      roll,
      profile_pic: image,
    });

    new_user.save();
    const all_users = await User.find({});
    console.log("~~~~~~~");
    res.status(200).send(all_users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// user_router.post("/api/new_user", async (req, res) => {
//   const { email, firstName, lastName, roll, address, phone, image } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     res.status(403).send("user with this email already exsits");
//   } else {
//     const new_user = await User.create({
//       firstName,
//       lastName,
//       email,
//       phone,
//       address,
//       roll,
//       profile_pic: image,
//     });
//     new_user.save();

//     res.status(200).send("user created succesfully");
//   }
// });

module.exports = { user_router };
