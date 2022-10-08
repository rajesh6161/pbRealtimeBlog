import React, { useEffect, useRef, useState } from 'react';
import PocketBase from 'pocketbase';

const TodoScreen = () => {
  const client = new PocketBase('http://127.0.0.1:8090');

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    todo: '',
    done: false,
  });
  const [error, setError] = useState('');
  const ref = useRef(null);

  // realtime
  useEffect(() => {
    client.realtime.subscribe('todoCollection', function (e) {
      // console.log('realtime', e.record);
      let x = todos.filter((item) => item.id !== e.record.id);
      setTodos([e.record, ...x]);
    });
    return () => {
      client.realtime.unsubscribe();
    };
  });

  const getTodos = async () => {
    try {
      const records = await client.records.getFullList('todoCollection', 20, {
        sort: '-created',
      });
      setTodos(records);
    } catch (error) {
      console.log('Error occurred while fetching todos', error);
    }
  };

  const createTodo = async () => {
    try {
      await client.records.create('todoCollection', todo);
    } catch (error) {
      setError(error.data.data.todo.message);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
    ref.current.value = '';
    todo.done = false;
    todo.todo = '';
  };

  const updateTodo = async ({ rec_id, data }) => {
    try {
      await client.records.update('todoCollection', rec_id, data);
    } catch (error) {
      console.log('Error occurred while updating the todo', error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="border w-[400px] h-screen relative bg-blue-200">
      <div className="py-2 px-3.5">
        <h1 className="text-2xl font-semibold">🏠 Todos</h1>
      </div>
      <div className="flex flex-col space-y-2  py-2 px-2 max-h-[510px] overflow-y-auto">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Todo
              key={todo.id}
              item={todo}
              todos={todos}
              setTodos={setTodos}
              todo={todo}
              updateTodo={updateTodo}
            />
          ))
        ) : (
          <p>No Todos</p>
        )}
      </div>
      <div className="p-2 absolute w-full bottom-1 space-y-2">
        <input
          type="text"
          placeholder="Enter Todo to add..."
          className="
            border
            border-blue-400
            p-2
            w-full
            focus:outline-none
            focus:ring-2
            focus:ring-blue-600
            focus:border-transparent
            rounded-lg
            bg-blue-200
            text-gray-700
            placeholder-gray-500
          "
          onChange={(e) =>
            setTodo({
              ...todo,
              todo: e.target.value,
            })
          }
          ref={ref}
        />
        <p className="text-red-500 leading-none">{error.length > 0 && error}</p>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600"
          onClick={createTodo}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

const Todo = ({ item, setTodos, todos, updateTodo }) => {
  return (
    <div className="flex items-center space-x-2 bg-blue-400 px-3 py-2 rounded-lg hover:bg-blue-500 max-h-16 cursor-pointer">
      <input
        type="checkbox"
        className="h-5 w-5 rounded-full focus:ring-0 focus:ring-offset-0 bg-blue-200 cursor-pointer"
        defaultChecked={item.done}
        onClick={() => {
          setTodos([
            ...todos.map((todo) => {
              if (todo.id === item.id) {
                todo.done = !todo.done;
              }
              return todo;
            }),
          ]);

          updateTodo({
            rec_id: item.id,
            data: {
              todo: item.todo,
              done: !!item.done,
            },
          });
        }}
      />
      <p
        className={`text-white text-lg  leading-none ${
          item.done ? 'line-through' : ''
        }`}
      >
        {item.todo}
      </p>
    </div>
  );
};

export default TodoScreen;
