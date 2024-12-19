import { useState } from "react";
import Addtask from "./AddTodo";
import { useUserContext } from "../customHooks/UserContext";

const List = () => {
  const data = useUserContext();
  const [task, setTask] = useState([]); // Initialize as an empty array
  const [filterText, setFilterText] = useState("");
  const [newTask, setNewTask] = useState("");
  const [isChecked, setIsChecked] = useState({});
  const [inputBox, setInputBox] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const handleEditTask = (id, taskText) => {
    setEditingTaskId(id);
    setEditedTask(taskText);
  };

  const handleSaveEdit = () => {
    if (editedTask.trim().length < 5 || editedTask.trim().length > 30) {
      alert("Task length must be in between 5-30");
      return;
    }
    const updateTask = task.map((todo) =>
      todo.id === editingTaskId ? { ...todo, todo: editedTask } : todo
    );
    setTask(updateTask);
    setEditingTaskId(null);
    setEditedTask("");
  };

  const handleCheckBoxChange = (id) => {
    setIsChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddNewTask = (e) => {
    if (newTask.length < 3) {
      alert("Minimum Task Length Is 3");
      return;
    }
    if (newTask.length > 30) {
      alert("Maximum task length is 30");
      return;
    }
    e.preventDefault();
    console.log("Adding new task:", newTask);

    const newtaskObj = {
      id: task.length + 1,
      todo: newTask,
    };
    setTask((prev) => [newtaskObj, ...prev]);
    setNewTask("");
    setInputBox(false);
  };

  if (data && data.todos && task.length === 0) {
    setTask(data.todos);
  }

  // Filter tasks based on user input
  const filteredTasks = task?.filter((task) =>
    task?.todo?.toLowerCase().includes(filterText.toLowerCase())
  );
  const handleDeleteTask = (id) => {
    const removeItem = task.filter((todo) => todo.id !== id);
    setTask(removeItem);
  };

  return (
    <div className=" flex flex-col items-center justify-start pt-10 h-screen bg-gray-200 p-4">
      {/* Add task component */}
      <Addtask
        data={data}
        // task={task}
        // setTask={setTask}
        handleAddNewTask={handleAddNewTask}
        filterText={filterText}
        setFilterText={setFilterText}
        inputBox={inputBox}
        setInputBox={setInputBox}
      />

      {/* Main container */}
      <div className=" w-full h-full lg:w-[70%] lg:h-auto bg-gray-200 shadow-lg rounded-sm p-6 overflow-y-auto ">
        {inputBox && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-30 z-50">
            <form
              className="flex flex-col items-center justify-center md:w-[30%] gap-2 pb-2 border-2 bg-gray-100 rounded-xl"
              onSubmit={handleAddNewTask}
            >
              <input
                type="textarea"
                placeholder="Enter your task here..."
                className="w-[98%] py-10 px-3 border mt-1 border-gray-300 rounded-lg"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />

              <div className="flex justify-start gap-5">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 ml-2 rounded-lg"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-6 mr-2 rounded-lg"
                  onClick={() => setInputBox(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List of tasks */}
        <ul className="space-y-2">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((todo) => (
              <li
                className="flex justify-between items-center gap-2 text-sm text-gray-700 border-b border-gray-300 pb-1"
                key={todo.id}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded-full bg-slate-100 shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                    checked={!!isChecked[todo.id]}
                    onChange={() => handleCheckBoxChange(todo.id)}
                  />

                  {editingTaskId === todo.id ? (
                    <input
                      type="text"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                    />
                  ) : (
                    <span
                      style={{
                        textDecoration: isChecked[todo.id]
                          ? "line-through"
                          : "none",
                        //   color: "green",
                        color: isChecked[todo.id] ? "green" : "black",
                      }}
                    >
                      {todo.todo}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {editingTaskId !== todo.id && (
                    <button
                      className="h-3 w-3 cursor-pointer rounded-full border bg-blue-500 border-blue-600"
                      onClick={() => handleEditTask(todo.id, todo.todo)}
                    />
                  )}
                  {editingTaskId === todo.id && (
                    <button
                      className="h-3 w-3 cursor-pointer rounded-full border bg-green-400 border=green-500"
                      onClick={() => handleSaveEdit(todo.id)}
                    />
                  )}

                  <button
                    className="h-3 w-3 cursor-pointer rounded-full border bg-red-500 border-red-600"
                    onClick={() => handleDeleteTask(todo.id)}
                  ></button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">No tasks found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default List;
