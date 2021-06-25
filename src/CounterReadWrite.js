import React, { useState } from 'react';
import CountContext from './CountContext';
import Child from './Child';

const CounterReadWrite = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((count) => count + 1);
  };

  return (
    // pass the value of count and the function to change it:
    <CountContext.Provider value={count}>
      {/* <button onClick={increment}>inc</button> */}
      <Child />
    </CountContext.Provider>
    //   <Something> rendered here won't have access to context data.
  );
};

export default CounterReadWrite;
