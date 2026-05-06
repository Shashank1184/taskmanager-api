import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:5090/api/tasks";

  useEffect(() => {
    axios.get(API).then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    if (!title) return;

    axios.post(API, { title, isCompleted: false })
      .then(res => {
        setTasks([...tasks, res.data]);
        setTitle("");
      });
  };

  const deleteTask = (id) => {
    axios.delete(`${API}/${id}`).then(() =>
      setTasks(tasks.filter(t => t.id !== id))
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>

      <input 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => deleteTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;