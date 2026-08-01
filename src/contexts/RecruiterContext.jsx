import React, { createContext, useContext, useState } from 'react';

const RecruiterContext = createContext();

export const RecruiterProvider = ({ children }) => {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  const toggleRecruiterMode = () => {
    setIsRecruiterMode((prev) => !prev);
  };

  return (
    <RecruiterContext.Provider value={{ isRecruiterMode, setIsRecruiterMode, toggleRecruiterMode }}>
      {children}
    </RecruiterContext.Provider>
  );
};

export const useRecruiter = () => useContext(RecruiterContext);
