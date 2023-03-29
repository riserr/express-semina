//Import mongoose package
const mongoose = require("mongoose");

//Get Schema and model module from mongoose
const { Schema, model } = mongoose;

//Create new Schema
const categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "Panjang nama kategori minimal 3 karakter"],
      maxlength: [20, "Panjang nama kategori maksimal 20 karakter"],
      required: [true, "Nama kategori harus diisi"],
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: [true, "Organizer harus diisi"],
    },
  },
  { timestamps: true }
);

//Create new Model and export
module.exports = model("Category", categorySchema);
