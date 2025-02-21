// const mongoose = require("mongoose");

// const taskSchema = mongoose.Schema({
//   title: { type: String, required: true },
//   desc: { type: String },
//   status: { type: Boolean, default: false },

// });

// const Task = mongoose.model("task", taskSchema);

// module.exports = Task;



const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String },
    status: { type: Boolean, default: false },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;




// const taskSchema = mongoose.Schema({
//     title: { type: String, required: true },    
//     status: { type: Boolean, default: false },
//     priority:{type:String,enum:["Low","Medium","High"],default:"Low"},
     
//   },
//   {
//     timestamps=true;
// }   
// );
  
//   const Task = mongoose.model("task", taskSchema);
  
//   module.exports = Task;