import React from 'react';
import useCounter from './useCounter';

const Counter = () => {
  // call the custom hook:
  const [count, setCount] = useCounter('count', 0);

  // function inherent to this particular component:
  const addToCount = () => {
    setCount((count) => count + 1);
  };

  return (
    <>
      <h4>{count}</h4>
      <button onClick={addToCount}>Add</button>
    </>
  );
};

export default Counter;
