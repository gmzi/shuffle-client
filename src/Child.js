import React, { useContext } from 'react';
import CountContext from './CountContext';
import QueueContext from './QueueContext';

const Child = () => {
  const color = React.useContext(QueueContext);
  return (
    <div>
      <p>Color: {color}</p>
    </div>
  );
};

export default Child;
