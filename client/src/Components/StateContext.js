import React, {useState} from 'react';

export const StateContext = React.createContext(null);

export const StateProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('Home');

  return (
    <StateContext.Provider
    activePage = {activePage}
    setActivePage = {setActivePage}
    >
      {children}
    </StateContext.Provider>
  )
}