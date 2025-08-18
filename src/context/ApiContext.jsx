import React, { createContext, useContext, useState, useEffect } from 'react';
import { dummyUsers } from '../data/users';

// Create context
const ApiContext = createContext(undefined);

// Environment variables
const USE_DUMP_DATA = import.meta.env.VITE_USE_DUMP_DATA === 'true';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

// API Context Provider
export const ApiProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: false,
  });

  // Initialize auth state (check for existing session)
  useEffect(() => {
    const initializeAuth = async () => {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      try {
        // TODO: Replace with real API call to check existing session
        // const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        //   credentials: 'include',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        //   }
        // });
        
        if (USE_DUMP_DATA) {
          // Simulate checking existing session with dummy data
          const savedUser = localStorage.getItem('currentUser');
          if (savedUser) {
            setAuthState({
              isAuthenticated: true,
              user: JSON.parse(savedUser),
              loading: false,
            });
            return;
          }
        }
        
        setAuthState(prev => ({ ...prev, loading: false }));
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };

    initializeAuth();
  }, []);

  // Sign In function
  const signIn = async (email, password) => {
    setAuthState(prev => ({ ...prev, loading: true }));

    try {
      if (USE_DUMP_DATA) {
        // Simulate API call with dummy data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        const user = dummyUsers.find(u => u.email === email);
        if (user && password === 'password123') { // Dummy password check
          const userData = { id: user.id, name: user.name, email: user.email, mobile: user.mobile };
          localStorage.setItem('currentUser', JSON.stringify(userData));
          setAuthState({
            isAuthenticated: true,
            user: userData,
            loading: false,
          });
          return { success: true, message: 'Sign in successful!' };
        } else {
          setAuthState(prev => ({ ...prev, loading: false }));
          return { success: false, message: 'Invalid email or password' };
        }
      } else {
        // TODO: Replace with real API call
        // const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ email, password }),
        // });
        // 
        // const data = await response.json();
        // 
        // if (response.ok) {
        //   localStorage.setItem('authToken', data.token);
        //   setAuthState({
        //     isAuthenticated: true,
        //     user: data.user,
        //     loading: false,
        //   });
        //   return { success: true, message: 'Sign in successful!' };
        // } else {
        //   setAuthState(prev => ({ ...prev, loading: false }));
        //   return { success: false, message: data.message || 'Sign in failed' };
        // }
        
        setAuthState(prev => ({ ...prev, loading: false }));
        return { success: false, message: 'API not configured' };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setAuthState(prev => ({ ...prev, loading: false }));
      return { success: false, message: 'An error occurred during sign in' };
    }
  };

  // Sign Up function
  const signUp = async (userData) => {
    setAuthState(prev => ({ ...prev, loading: true }));

    try {
      if (USE_DUMP_DATA) {
        // Simulate API call with dummy data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        // Check if user already exists
        const existingUser = dummyUsers.find(u => u.email === userData.email);
        if (existingUser) {
          setAuthState(prev => ({ ...prev, loading: false }));
          return { success: false, message: 'User with this email already exists' };
        }
        
        // Create new user
        const newUser = {
          id: `user_${Date.now()}`,
          name: userData.name,
          email: userData.email,
          mobile: userData.mobile,
        };
        
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setAuthState({
          isAuthenticated: true,
          user: newUser,
          loading: false,
        });
        return { success: true, message: 'Account created successfully!' };
      } else {
        // TODO: Replace with real API call
        // const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(userData),
        // });
        // 
        // const data = await response.json();
        // 
        // if (response.ok) {
        //   localStorage.setItem('authToken', data.token);
        //   setAuthState({
        //     isAuthenticated: true,
        //     user: data.user,
        //     loading: false,
        //   });
        //   return { success: true, message: 'Account created successfully!' };
        // } else {
        //   setAuthState(prev => ({ ...prev, loading: false }));
        //   return { success: false, message: data.message || 'Sign up failed' };
        // }
        
        setAuthState(prev => ({ ...prev, loading: false }));
        return { success: false, message: 'API not configured' };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setAuthState(prev => ({ ...prev, loading: false }));
      return { success: false, message: 'An error occurred during sign up' };
    }
  };

  // Sign Out function
  const signOut = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  };

  const value = {
    authState,
    signIn,
    signUp,
    signOut,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

// Custom hook to use the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};