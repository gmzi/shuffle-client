import React from 'react';

const CountContext = React.createContext(null);

export default CountContext;

/* this will create the Context object with its metod <MyContext.Provider value={some}/> that
we can use to wrap the components where we will use the context. Everything nested inside
of the provider will have access to whatever data is stored in the Context. */
