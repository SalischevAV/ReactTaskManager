import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TodoList from "./Todo/TodoList";
import Context from './Context';
import Loader from './Loader';
import Modal from './Modal/Modal';

const AddTodo = React.lazy(()=>import('./Todo/AddTodo'));

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(res => {
        setTimeout(() =>{
          setTodos(res);
          setLoading(false);
        }, 3000);
      });
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat([{
        title,
        id: Date.now(),
        completed: false,
      }])
    )
  }

  return (
    <Context.Provider value={{ removeTodo: removeTodo }}>
      <div className="wrapper">
        <h1>React TodoList</h1>
        <Modal />

        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}

        {
          todos.length ? (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
            />
          ) : (
            loading ? null : <p>Nothing to do</p>
            )
        }


      </div>
    </Context.Provider>
  );
}

export default App;
