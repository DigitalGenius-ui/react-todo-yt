import React from "react";

const Layer = ({ text }) => {
  return (
    <div className="p-3">
      <h1 className="text-center capitalize font-bold text-lg pb-3">
        This is your full Todo
      </h1>
      <p className="text-slate-200 font-light h-[20rem] overflow-y-auto">{text}</p>
    </div>
  );
};

export default Layer;
