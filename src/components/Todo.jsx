import React, { useEffect, useState } from "react";
import moment from "moment";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Layer from "./Layer";

const Todo = ({ setTodoList, todoList, setEditTodo }) => {
  const [showTodo, setShowTodo] = useState(false);

  const sortedTodo = todoList.sort((a, b) => new Date(b.time) - new Date(a.time))

  const removeTodo = (id) => {
    setTodoList((prev) => prev.filter((el) => el.id !== id));
  };

  const readMore = () => {
    setShowTodo(true);
  };

  const editTodo = (id) => {
    const todo = todoList.find((item) => item.id === id);
    setEditTodo(todo);
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

  return (
    <div id="todos">
      {sortedTodo?.map((todo, i) => (
        <div key={i} className=" bg-todo p-2 rounded-md w-full h-full">
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
              {todo.text.length > 40 && (
                <button
                  onClick={readMore}
                  className="text-red-400 text-xs hover:text-red-600"
                >
                  ...more
                </button>
              )}
            </h1>

            <div className="flex items-center justify-end gap-1 py-2">
              <span
                onClick={() => completed(todo.id)}
                className="cursor-pointer hover:text-slate-500"
              >
                <BsFillCheckCircleFill className="text-sm" />
              </span>
              <span
                onClick={() => editTodo(todo.id)}
                className="cursor-pointer hover:text-slate-500"
              >
                <AiTwotoneEdit />
              </span>
              <span
                onClick={() => removeTodo(todo.id)}
                className="cursor-pointer hover:text-slate-500"
              >
                <AiTwotoneDelete />
              </span>
            </div>
          </div>

          {showTodo && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-600/75">
              <span
                onClick={() => setShowTodo(false)}
                className="absolute top-10 right-10 text-xl cursor-pointer hover:text-slate-500"
              >
                <FaTimes />
              </span>
              <div className="w-[25rem] h-[25rem] bg-todo rounded-md">
                <Layer text={todo.text} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;
