const mongoose = require("mongoose");
const electronicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minlength: [10, "Name should be at least 10 characters!"],
  },
  type: {
    type: String,
    required: [true, "Type is required!"],
    minlength: [2, "Type should be at least 2 characters!"],
  },
  image: {
    type: String,
    required: [true, "Photo is required!"],
    validate: {
      validator: (value) => {
        return /^https?:\/\//.test(value);
      },
      message: "Photo URL must start with http:// or https:// !",
    },
  },
  damages: {
    type: String,
    required: [true, "Damages is required!"],
    minlength: [10, "Damages should be at least 10 characters!"]
    
  },
  production: {
    type: Number,
    required: [true, "Production is required!"],
    min:[1990, 'Production must be at least 1990!'],
    max:[2023, 'Production must be at most 2023!'],
   
  },
  exploitation : {
    type: Number,
    required: [true, "Exploatation is required!"],
    validate: {
      validator: function(value) {
        return value > 0;
      },
      message: 'Exploatation must be a positive number!'
    }
    
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
    validate: {
      validator: function(value) {
        return value > 0;
      },
      message: 'Price must be a positive number!'
    }
    
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    minlength: [10, "Description should be at least 10 characters!"],
    maxlength: [200, "Description should be at most 200 characters!"],
  },
  buyingList: [{type:mongoose.Types.ObjectId}],
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Electronic = mongoose.model("Electronic", electronicSchema);

module.exports = Electronic;
