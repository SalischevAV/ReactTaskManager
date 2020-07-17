import React from 'react';
import { useState } from 'react';
import TodoList from "./Todo/TodoList";
import AddTodo from './Todo/AddTodo';
import Context from './Context';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, completed: false, title: "Buy smth1" },
    { id: 2, completed: true, title: "Buy smth2" },
    { id: 3, completed: false, title: "Buy smth3" },
  ]);


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

  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo(title){
    setTodos(
      todos.concat([{
        title,
        id: Date.now(),
        completed: false,
      }])
    )
  }

  return (
    <Context.Provider value={{removeTodo: removeTodo}}>
    <div className="wrapper">
      <h1>React Tutorial</h1>
      <AddTodo onCreate={addTodo} />
      {
        todos.length ? (
          <TodoList
          todos={todos}
          onToggle={toggleTodo}
        />
        ) :(
          <p>Nothing to do</p>
        )
      }
     

    </div>
    </Context.Provider>
  );
}

export default App;
