


// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const Task = require("./task.model");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Step 1 : Connecting to MongoDB before starting the server
// async function connectDB() {
//     try {
//       await mongoose.connect(process.env.MONGO_URI);
//         // await mongoose.connect(
//         //      "mongodb+srv://hanithakkar887:pass1234@cluster0.o4frxux.mongodb.net/crud?retryWrites=true&w=majority"
//         // );
//         console.log("[server] : MongoDB connected");
//     } catch (err) {
//         console.error("[server] : Error connecting to Mongo Atlas", err);
//         process.exit(1); // Exit 
//     }
// }

// // Step 2 : Start server after MongoDB connection
// connectDB().then(() => {
//     app.listen(8080, () => {
//         console.log("[server] : Running on port 8080");
//     });
// });

// // Step 3 : Creating API routes

// // Home route
// app.get("/", (req, res) => {
//     res.send("Welcome to my server");
// });

// // CREATE
// app.post("/create", async (req, res) => {
//     try {
//         const { title, desc, status } = req.body;
//         const task = await Task.create({ title, desc, status });
//         res.status(201).json({ message: "Your task is created", task });
//     } catch (error) {
//         res.status(500).json({ message: "Error creating task", error });
//     }
// });

// // READ
// app.get("/read", async (req, res) => {
//     try {
//         const tasks = await Task.find({});
//         res.json({ message: "Here are your tasks", tasks });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching tasks", error });
//     }
// });

// // DELETE
// app.delete("/tasks/:id", async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id);
//         if (!task) {
//             return res.status(404).json({ message: "Task not found" });
//         }
//         res.json({ message: "Task deleted", task });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting task", error });
//     }
// });




// app.patch("/tasks/:id", async (req, res) => {
//   try {
//       const { title, desc, status } = req.body;
//       const task = await Task.findByIdAndUpdate(req.params.id, { title, desc, status }, { new: true });

//       if (!task) {
//           return res.status(404).json({ message: "Task not found" });
//       }
//       res.json({ message: "Task updated", task });
//   } catch (error) {
//       res.status(500).json({ message: "Error updating task", error });
//   }
// });






require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Task = require("./task.model");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Step 1: Connecting to MongoDB before starting the server
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("[server] : MongoDB connected");
    } catch (err) {
        console.error("[server] : Error connecting to Mongo Atlas", err);
        process.exit(1);
    }
}

// Step 2: Start server after MongoDB connection
connectDB().then(() => {
    app.listen(8080, () => {
        console.log("[server] : Running on port 8080");
    });
});

// Step 3: API Routes

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to my server");
});

// UPDATE Task
app.patch("/tasks/:id", async (req, res) => {
    try {
        const { title, desc, status, priority } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { title, desc, status, priority }, { new: true });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task updated", task });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});

// DELETE Task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted", task });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});

// READ All Tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json({ message: "Here are your tasks", tasks });
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
});

// CREATE Task
app.post("/tasks", async (req, res) => {
    try {
        const { title, desc, status, priority } = req.body;
        const task = await Task.create({ title, desc, status, priority });
        res.status(201).json({ message: "Your task is created", task });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
});
