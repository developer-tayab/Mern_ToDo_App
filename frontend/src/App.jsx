// === Frontend Fixes ===
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [task, setTask] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);

  // Create Todo
  const submitTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/create", {
        task,
        content,
      });
      setTask("");
      setContent("");
      fetchData();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Fetch Todos
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/todo");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete Todo
  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todo/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Toggle Completed Status
  const toggleStatus = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/todo/status/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex flex-col items-center">
      <form
        onSubmit={submitTask}
        className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Add New Task
        </h2>
        <input
          type="text"
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task Title"
          className="w-full p-3 mb-3 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Task Description"
          className="w-full p-3 mb-3 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </form>

      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {data.map((todo) => (
          <div
            key={todo._id}
            className={`p-5 rounded-lg shadow-md ${
              todo.completed ? "bg-green-100" : "bg-white"
            }`}
          >
            <h3
              className={`text-xl font-semibold ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.task}
            </h3>
            <p
              className={`mt-2 ${
                todo.completed ? "line-through text-gray-500" : "text-gray-600"
              }`}
            >
              {todo.content}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => toggleStatus(todo._id)}
                className={`px-3 py-1 rounded-md ${
                  todo.completed ? "bg-yellow-400" : "bg-green-500"
                } text-white`}
              >
                {todo.completed ? "Incomplete" : "Complete"}
              </button>
              <button
                onClick={() => removeTodo(todo._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
