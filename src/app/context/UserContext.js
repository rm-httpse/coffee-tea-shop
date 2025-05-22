'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Client-side only check
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('luven_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('luven_user');
        }
      }
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('luven_user', JSON.stringify(newUser));
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
