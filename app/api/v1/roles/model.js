const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const roleSchema = Schema(
  {
    role: {
      type: String,
      enum: ["admin", "organizer", "owner"],
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = model("Role", roleSchema);
