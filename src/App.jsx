import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      settodos(JSON.parse(savedTodos));
    }
  }, []);

  const handleAdd = () => {
    if (todo.trim() === "") return;

    if (isEditing) {
      const updatedTodos = todos.map((item) =>
        item.id === editId ? { ...item, todo } : item
      );
      settodos(updatedTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
      settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    }
    settodo("");
    saveTodos();
  };

  const handleDelete = (id) => {
    const filteredTodos = todos.filter((item) => item.id !== id);
    settodos(filteredTodos);
    saveTodos();
  };

  const handleEdit = (id) => {
    const t = todos.find((item) => item.id === id);
    settodo(t.todo);
    setIsEditing(true);
    setEditId(id);
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckBox = (id) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, iscompleted: !item.iscompleted };
      }
      return item;
    });
    settodos(updatedTodos);
    saveTodos();
  };

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleShowFinished = () => {
    setShowFinished((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="md:container mx-auto my-5 rounded-xl bg-violet-500 p-5 min-h-[80vh] md:w-1/2">
        <div className="addTodo my-5 flex-col flex gap-4 ">
          <h1 className="text-lg font-bold text-4xl text-white text-center">Todo-App - Manage Your Tasks</h1>
          <h2 className="text-lg font-bold">
            {isEditing ? "Edit Todo" : "Add a Todo"}
          </h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-lg px-7 py-4"
            placeholder="Type your todo..."
          />
          <button
            onClick={handleAdd}
            disabled={todo.trim() === ""}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md "
          >
            {isEditing ? "Update" : "Save"}
          </button>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleShowFinished}
            className="form-checkbox h-5 w-1/2 text-violet-800"
          />
          <label className="text-xl font-bold">Show Finished Todos</label>
        </div>

        <h2 className="text-xl font-bold">Your Todos</h2>
        {todos.length === 0 && <div className="m-5">No todos yet</div>}
        <div className="todos">
          {todos
            .filter((item) => showFinished || !item.iscompleted)
            .map((item) => (
              <div key={item.id} className="todo flex w-full justify-between my-3">
                <div className="flex gap-5 flex-1 items-center">
                  <input
                    name={item.id}
                    onChange={() => handleCheckBox(item.id)}
                    type="checkbox"
                    checked={item.iscompleted}
                    className="form-checkbox h-5 w-5 text-violet-800"
                  />
                  <div
                    className={`flex-1 overflow-hidden overflow-ellipsis whitespace-normal ${
                      item.iscompleted ? "line-through" : ""
                    }`}
                  >
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
