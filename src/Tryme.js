import React, { useContext } from 'react';
import { QueueContext } from './QueueContext';
import useCounter from './useCounter';

export default function Tryme() {
  const [count, incr, decr] = useCounter();

  return (
    <div>
      <h1>Try me!!!</h1>;<h1>{count}</h1>
    </div>
  );
}
