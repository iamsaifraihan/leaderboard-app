import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  console.log("Counter re-rendered");

  const handleClick = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <p className="font-bold">
        Counter Value : <span className="text-teal-200">{counter}</span>
      </p>
      <button
        className="px-2 py-1 border border-blue-900"
        type="button"
        onClick={handleClick}
      >
        Increment
      </button>
    </>
  );
};

export default Counter;
