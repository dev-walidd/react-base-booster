import { useApi } from '../context/ApiContext';

// Custom hook that provides a more convenient interface for authentication
export const useAuth = () => {
  const { authState, signIn, signUp, signOut } = useApi();

  return {
    // State
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.loading,
    
    // Actions
    signIn,
    signUp,
    signOut,
    
    // Computed values
    userDisplayName: authState.user?.name || 'Guest',
    userEmail: authState.user?.email || '',
  };
};