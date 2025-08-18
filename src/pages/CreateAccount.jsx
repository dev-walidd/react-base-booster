import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useApi } from '../context/ApiContext';
import { toast } from '../hooks/use-toast';
import Logo from '../components/Logo';
import FormField from '../components/FormField';

const CreateAccount = () => {
  const navigate = useNavigate();
  const { signUp, authState } = useApi();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Create email from mobile (for demo purposes)
    const email = `${formData.mobile.replace(/[^0-9]/g, '')}@mobile.demo`;

    const result = await signUp({
      name: formData.name,
      email,
      mobile: formData.mobile,
      password: formData.password,
    });
    
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
            <h1 className="text-2xl font-normal mb-4 text-foreground">Create Account</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                id="name"
                label="Your name"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                required
              />
              
              <FormField
                id="mobile"
                label="Mobile number"
                type="tel"
                value={formData.mobile}
                onChange={(value) => setFormData(prev => ({ ...prev, mobile: value }))}
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
                {authState.loading ? 'Creating account...' : 'Verify mobile number'}
              </Button>
            </form>

            <div className="mt-6 text-sm">
              <div className="text-amazon-gray mb-2">Buying for work?</div>
              <Link to="#" className="text-link-blue hover:text-link-blue-hover hover:underline text-sm">
                Create a free business account
              </Link>
            </div>

            <div className="mt-6 text-center">
              <span className="text-sm text-amazon-gray">Already have an account? </span>
              <Link 
                to="/signin" 
                className="text-link-blue hover:text-link-blue-hover hover:underline text-sm"
              >
                Sign in ▸
              </Link>
            </div>

            <div className="mt-4 text-xs text-amazon-gray">
              By creating an account or logging in, you agree to Amazon's{' '}
              <Link to="#" className="text-link-blue hover:text-link-blue-hover hover:underline">
                Conditions of Use
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-link-blue-hover hover:underline">
                Privacy Notice
              </Link>
              .
            </div>
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
};

export default CreateAccount;