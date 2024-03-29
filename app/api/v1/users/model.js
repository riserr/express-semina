const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "nama harus diisi"],
      minlength: [3, " nama minimal 3 karakter"],
      maxlength: [50, "nama maksimal 50 karakter"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email harus diisi"],
    },
    password: {
      type: String,
      required: [true, "password harus diisi"],
      minlength: [6, "password minimal 6 karakter"],
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref: "Role",
      required: true,
      /*type: String,
      enum: ["admin", "organizer", "owner"],
      default: "admin",*/
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = model("User", userSchema);
