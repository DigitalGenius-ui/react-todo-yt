import React, { useEffect, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Todo from "./Todo";

const Todos = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todo")) || []
  );
  const [editTodo, setEditTodo] = useState(null);

  // add emoji
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setText(text + emoji);
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  // edit todos
  const updateTodo = (text, id, completed) => {
    const newTodo = todoList.map((todo) => {
      return todo.id === id ? { text, id, completed, time: new Date() } : todo;
    });
    setTodoList(newTodo);
    setEditTodo(null);
    setText("");
    setShowEmoji(false);
  };

  useEffect(() => {
    if (editTodo) {
      setText(editTodo.text);
    } else {
      setText("");
    }
  }, [editTodo]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!editTodo) {
      const id = Math.random(Math.round() * 10000000);
      const todo = {
        id,
        text,
        time: new Date(),
        completed: false,
      };
      setTodoList([...todoList, todo]);
      setText("");
      setShowEmoji(false);
    } else {
      updateTodo(text, editTodo.id, editTodo.completed);
    }
  };

  return (
    <div className="pt-3rem w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] mx-auto">
      <h1 className="text-2 font-medium text-center capitalize">
        tailwind todo list
      </h1>

      {/* todo input  */}
      <div>
        <form onSubmit={addTodo} className="flex items-start gap-2 pt-2rem">
          <div className="w-full flex items-end p-2 bg-todo rounded-sm relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="write your text"
              className="w-full bg-transparent outline-none resize-none text-sm"
              cols="30"
              rows="2"
            ></textarea>

            <span
              onClick={() => setShowEmoji(!showEmoji)}
              className="cursor-pointer hover:text-slate-300"
            >
              <BsEmojiSmile />
            </span>

            {showEmoji && (
              <div className="absolute top-[100%] right-2">
                <Picker
                  data={data}
                  emojiSize={20}
                  emojiButtonSize={28}
                  onEmojiSelect={addEmoji}
                  maxFrequentRows={0}
                />
              </div>
            )}
          </div>

          <button
            className="flex items-center capitalize gap-2 bg-yellow-200 text-black py-1.5
          px-3 rounded-sm hover:bg-yellow-100
          "
          >
            <AiOutlinePlus />
            {editTodo ? "update" : "add"}
          </button>
        </form>

        {/* print the todo lists  */}
        <div className="pt-2rem">
          <Todo
            todoList={todoList}
            setTodoList={setTodoList}
            setEditTodo={setEditTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default Todos;
