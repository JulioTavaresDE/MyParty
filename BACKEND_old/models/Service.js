// const mongoose = require("mongoose")

// const { Schema } = mongoose;

// const serviceSchema = new Schema(
//     {
//     name : {
//         type:String,
//         require: true,
//     },
//     description :{
//         type:String,
//         require: true,
//     },
//     price : {
//         type:Number,
//         require: true,
//     },
//     image: String,
// },
//     { timestamps: true }   
// ); 

// const service = mongoose.model("Service", serviceSchema)

// module.exports = {
//     service,
//     serviceSchema,
// }

const mongoose = require("mongoose");

const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: String,
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = {
  Service,
  serviceSchema,
};
