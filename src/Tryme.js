import React, { useContext } from 'react';
import { QueueContext } from './QueueContext';

export default function Tryme() {
  const val = useContext(QueueContext);
  console.log(val);
  return <h1>Try me!!!</h1>;
}
