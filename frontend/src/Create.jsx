import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [task, setTask] = useState();

  const handleAdd = () => {
    axios
      .post("http://localhost:6001/add", { task })
      .then((res) => console.log(res))
      .catch((err) => console.error("Error adding task:", err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default Create;
