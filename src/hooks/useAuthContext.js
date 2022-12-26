import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  // log this out just to check what's the falsy and truthy value of it

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }

  return context;
};
