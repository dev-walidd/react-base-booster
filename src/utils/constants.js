// Application constants
export const APP_NAME = 'Amazon Clone';
export const APP_VERSION = '1.0.0';

// API constants
export const API_ENDPOINTS = {
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  VERIFY: '/auth/verify',
  SIGNOUT: '/auth/signout',
} as const;

// Environment helper
export const isUsingDummyData = () => {
  return import.meta.env.VITE_USE_DUMP_DATA === 'true';
};

export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';
};

// Form validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[(]?[\d\s\-\(\)]{10,}$/,
  MIN_PASSWORD_LENGTH: 6,
} as const;