const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String, default: "---No sigining premission --" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    roll: { type: String, default: "" },
    start_date: { type: String, default: "" },
    profile_pic: { type: String, default: "" },
    is_admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
