import React from 'react';
import useToken from './useToken';

const Counter = () => {
  // call the custom hook:
  // const [count, setCount] = useToken('count', 432);

  // // function inherent to this particular component:
  // const addToCount = () => {
  //   setCount((count) => 'papa');
  // };

  return (
    <h1>hi</h1>
    // <>
    //   <h4>{count}</h4>
    //   <button onClick={addToCount}>Add</button>
    // </>
  );
};

export default Counter;
