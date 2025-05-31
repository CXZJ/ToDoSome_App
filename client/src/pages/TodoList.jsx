import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../features/todo/todoSlice';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState({
    todo_name: '',
    todo_desc: '',
    todo_status: 'active',
    todo_image: 'https://api.dicebear.com/9.x/icons/svg?seed=Katherine',
  });

  const [editingTodo, setEditingTodo] = useState(null);

  const dispatch = useDispatch();
  const { todos, loading } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  const handleCreateTodo = (e) => {
    e.preventDefault();
    dispatch(createTodo(newTodo));
    setNewTodo({
      todo_name: '',
      todo_desc: '',
      todo_status: 'active',
      todo_image: 'https://api.dicebear.com/9.x/icons/svg?seed=Katherine',
    });
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ id: editingTodo._id, todoData: editingTodo }));
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      dispatch(deleteTodo(id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Todo List</h1>

      {/* Create Todo Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
        <form onSubmit={handleCreateTodo}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Todo Name
              </label>
              <input
                type="text"
                value={newTodo.todo_name}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, todo_name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newTodo.todo_desc}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, todo_desc: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Add Todo
          </button>
        </form>
      </div>

      {/* Todo List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            {editingTodo?._id === todo._id ? (
              <form onSubmit={handleUpdateTodo}>
                <input
                  type="text"
                  value={editingTodo.todo_name}
                  onChange={(e) =>
                    setEditingTodo({
                      ...editingTodo,
                      todo_name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                />
                <input
                  type="text"
                  value={editingTodo.todo_desc}
                  onChange={(e) =>
                    setEditingTodo({
                      ...editingTodo,
                      todo_desc: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                />
                <select
                  value={editingTodo.todo_status}
                  onChange={(e) =>
                    setEditingTodo({
                      ...editingTodo,
                      todo_status: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTodo(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <img
                  src={todo.todo_image}
                  alt={todo.todo_name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{todo.todo_name}</h3>
                <p className="text-gray-600 mb-4">{todo.todo_desc}</p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      todo.todo_status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {todo.todo_status}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingTodo(todo)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList; 
