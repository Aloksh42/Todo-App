require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findOne({ _id: id });

    if (todo) {
      const updatedDoneValue = !todo.done;

      await TodoModel.findByIdAndUpdate(
        { _id: id },
        {
          done: updatedDoneValue,
        }
      );

      res.json({ success: true });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT, () => {
      console.log("Server is Running !");
    })
  )
  .catch((err) => {
    console.log(err);
  });
