import React, { useState, useEffect } from 'react';

const useToken = (key, defaultValue) => {
  // Instead of setting the initial value directly, use a callback function to check if is
  // there any previous value in localStorage:
  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || JSON.stringify(defaultValue)
      );
    } catch (e) {
      console.log(e);
      value = defaultValue;
    }
    // useState will have this value:
    return value;
  });

  // call useState if there's any change in the value or if the function is called:
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  // return the state value and the function:
  return [state, setState];
};

export default useToken;
