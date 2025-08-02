import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('emailCampaignUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('emailCampaignUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simple authentication - in production, this would be API calls
    const users = JSON.parse(localStorage.getItem('emailCampaignUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userSession = { id: user.id, email: user.email, name: user.name };
      setUser(userSession);
      localStorage.setItem('emailCampaignUser', JSON.stringify(userSession));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('emailCampaignUsers') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('emailCampaignUsers', JSON.stringify(users));
    
    const userSession = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userSession);
    localStorage.setItem('emailCampaignUser', JSON.stringify(userSession));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('emailCampaignUser');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};