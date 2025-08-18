import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useApi } from '../context/ApiContext';
import Logo from '../components/Logo';

const Dashboard = () => {
  const navigate = useNavigate();
  const { authState, signOut } = useApi();

  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };

  if (!authState.isAuthenticated) {
    navigate('/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <Button variant="amazon-outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-4 text-foreground">
                Welcome to your Dashboard!
              </h1>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    User Information
                  </h2>
                  <div className="bg-muted p-4 rounded">
                    <p><strong>Name:</strong> {authState.user?.name}</p>
                    <p><strong>Email:</strong> {authState.user?.email}</p>
                    <p><strong>Mobile:</strong> {authState.user?.mobile}</p>
                    <p><strong>User ID:</strong> {authState.user?.id}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    API Configuration
                  </h2>
                  <div className="bg-muted p-4 rounded text-sm">
                    <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
                    <p><strong>Using Dump Data:</strong> {import.meta.env.VITE_USE_DUMP_DATA || 'false'}</p>
                    <p><strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'Not configured'}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">🚀 Development Notes</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Authentication is working with Context API</li>
                    <li>• Environment variables are configured for API switching</li>
                    <li>• Currently using dummy data (VITE_USE_DUMP_DATA=true)</li>
                    <li>• Ready to replace with real API endpoints</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;