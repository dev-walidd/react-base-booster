import { User } from '../context/ApiContext';

// Dummy user data for development and testing
// This simulates the API response when VITE_USE_DUMP_DATA=true
export const dummyUsers: User[] = [
  {
    id: 'user_1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+1234567890',
  },
  {
    id: 'user_2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    mobile: '+1987654321',
  },
  {
    id: 'user_3',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    mobile: '+1122334455',
  },
];

// For testing purposes, all dummy users use the password: "password123"
export const DUMMY_PASSWORD = 'password123';