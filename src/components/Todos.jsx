import React, { useState, useEffect } from "react";
import { GrAdd, GrEmoji } from "react-icons/gr";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Todo from "./Todo";

const Todos = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todo")) || []
  );

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  // add emoji
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
  };

  // edit Todo
  const updateData = (id, text, completed) => {
    let newTodo = todoList.map((item) => {
      return item.id === id ? { id, text, completed, time: new Date() } : item;
    });
    setTodoList(newTodo);
    setEditTodo("");
    setText("");
  };

  useEffect(() => {
    if (editTodo) {
      setText(editTodo.text)
    } else {
      setText("");
    }
  },[editTodo])

  // add todo
  const addTodo = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 100000);
    if (!editTodo) {
      const todo = {
        id: id,
        text,
        time: new Date(),
        completed: false,
      };

      setText("");
      setShowEmoji(false);
      setTodoList([...todoList, todo]);
    } else {
      updateData(editTodo.id, text, editTodo.completed);
    }
  };

  return (
    <div className="pt-3rem w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] mx-auto">
      <h1 className="text-2 font-medium text-center">Tailwind Todo List</h1>

      {/* todos input */}
      <div>
        <form onSubmit={addTodo} className="flex items-start gap-2 pt-2rem">
          <div className="w-full bg-todo flex items-end p-2 rounded-sm relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="write your todo..."
              className="w-full bg-transparent outline-none resize-none text-sm"
              cols="30"
              rows="2"
            ></textarea>

            <span
              onClick={() => setShowEmoji(!showEmoji)}
              className="cursor-pointer hover:text-slate-300"
            >
              <GrEmoji />
            </span>

            {showEmoji && (
              <div className="absolute top-[100%] right-2">
                <Picker
                  showPreview={false}
                  onEmojiSelect={addEmoji}
                  data={data}
                  emojiSize={20}
                  emojiButtonSize={28}
                  maxFrequentRows={0}
                />
              </div>
            )}
          </div>
          <button
            className="flex items-center gap-2 
        bg-yellow-200 text-black py-1.5 px-3 rounded-sm hover:bg-yellow-100"
          >
            <GrAdd /> {editTodo ? "Update" : "Add"}
          </button>
        </form>

        {/* all todos  */}
        <div className="pt-2rem">
          <Todo
            setEditTodo={setEditTodo}
            setTodoList={setTodoList}
            todoList={todoList}
          />
        </div>
      </div>
    </div>
  );
};

export default Todos;
