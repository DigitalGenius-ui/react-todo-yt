import React, { useState } from "react";
import moment from "moment";
import {
  AiTwotoneDelete,
  AiTwotoneEdit,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import Layer from "./Layer";

const Todo = ({ todoList, setTodoList, setEditTodo }) => {
  const [showText, setShowText] = useState(false);
  const [showFullText, setShowFullText] = useState("");

  // sort data
  const sortedTodo = todoList.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const completed = (id) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  // edit todo
  const editTodoList = (id) => {
    const newTodo = todoList.find((todo) => todo.id === id);
    setEditTodo(newTodo);
  };

  const fullText = (id) => {
      const todoText = todoList.find((todo) => todo.id === id);
      setShowFullText(todoText.text);
      setShowText(true);
  };

  return (
    <div id="todos">
      {sortedTodo.map((todo, i) => (
        <div key={i} className="bg-todo p-2 rounded-md w-full h-full">
          <span className="text-xs text-slate-400">
            {moment(todo.time).fromNow()}
          </span>

          <div className="flex flex-col justify-between h-[80%]">
            <h1
              className={`pt-3 text-sm ${
                todo.completed ? "line-through text-slate-400" : ""
              }`}
            >
              {todo.text.substring(0, 36)}
              {todo.text.length > 36 && (
                <button
                  onClick={() => fullText(todo.id)}
                  className="text-red-400 text-xs hover:text-red-600"
                >
                  ...more
                </button>
              )}
            </h1>

            <div className="flex items-center justify-end gap-1 py-2">
              <span
                onClick={() => deleteTodo(todo.id)}
                className="cursor-pointer hover:text-slate-500"
              >
                <AiTwotoneDelete />
              </span>
              <span
                onClick={() => editTodoList(todo.id)}
                className="cursor-pointer hover:text-slate-500"
              >
                <AiTwotoneEdit />
              </span>
              <span
                onClick={() => completed(todo.id)}
                className="cursor-pointer hover:text-slate-500"
              >
                <AiOutlineCheckCircle />
              </span>
            </div>
          </div>

          {showText && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-600/75">
              <span
                onClick={() => setShowText(false)}
                className="absolute top-10 right-10 text-xl cursor-pointer hover:text-slate-500"
              >
                <FaTimes />
              </span>
              <div className="w-[25rem] h-[25rem] bg-todo rounded-md">
                <Layer text={showFullText} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;
