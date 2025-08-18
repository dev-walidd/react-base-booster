import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useApi } from '../context/ApiContext';
import { toast } from '../hooks/use-toast';
import Logo from '../components/Logo';
import FormField from '../components/FormField';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, authState } = useApi();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const result = await signIn(formData.email, formData.password);
    
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Logo />
        
        <Card className="shadow-sm border">
          <CardContent className="p-6">
            <h1 className="text-2xl font-normal mb-4 text-foreground">Sign in</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                id="email"
                label="Email or mobile phone number"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                required
              />
              
              <FormField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                required
              />

              <Button 
                type="submit" 
                variant="amazon" 
                size="lg" 
                className="w-full"
                disabled={authState.loading}
              >
                {authState.loading ? 'Signing in...' : 'Continue'}
              </Button>
            </form>

            <div className="mt-4 text-xs text-amazon-gray">
              By continuing, you agree to Amazon's{' '}
              <Link to="#" className="text-link-blue hover:text-link-blue-hover hover:underline">
                Conditions of Use
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-link-blue hover:text-link-blue-hover hover:underline">
                Privacy Notice
              </Link>
              .
            </div>

            <details className="mt-4">
              <summary className="text-xs text-link-blue hover:text-link-blue-hover cursor-pointer">
                ► Need help?
              </summary>
              <div className="mt-2 text-xs text-amazon-gray">
                <Link to="#" className="text-link-blue hover:text-link-blue-hover hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </details>

            <div className="mt-6 text-sm">
              <div className="text-amazon-gray mb-2">Buying for work?</div>
              <Link to="#" className="text-link-blue hover:text-link-blue-hover hover:underline text-sm">
                Shop on Amazon Business
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="text-xs text-amazon-gray mb-3">New to Amazon?</div>
          <Button 
            variant="amazon-outline" 
            size="lg" 
            className="w-full"
            onClick={() => navigate('/create-account')}
          >
            Create your Amazon account
          </Button>
        </div>

        <div className="mt-8 text-center space-x-4 text-xs text-link-blue">
          <Link to="#" className="hover:text-link-blue-hover hover:underline">
            Conditions of Use
          </Link>
          <Link to="#" className="hover:text-link-blue-hover hover:underline">
            Privacy Notice
          </Link>
          <Link to="#" className="hover:text-link-blue-hover hover:underline">
            Help
          </Link>
        </div>

        <div className="mt-2 text-center text-xs text-amazon-gray">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </div>

        {/* Development Note */}
        <div className="mt-4 p-3 bg-muted rounded text-xs text-muted-foreground">
          <strong>Demo Credentials:</strong><br />
          Email: john.doe@example.com<br />
          Password: password123
        </div>
      </div>
    </div>
  );
};

export default SignIn;