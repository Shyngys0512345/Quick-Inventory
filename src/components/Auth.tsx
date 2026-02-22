import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Input, Card } from './ui/Shared';
import { Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const LoginPage: React.FC = () => {
  const { login, navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    login(email, 'Manager'); // Default to Manager for demo
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/30 blur-[100px] animate-pulse" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/30 blur-[100px] animate-pulse delay-1000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="p-8 backdrop-blur-sm bg-white/95 shadow-2xl border-white/20">
          <div className="text-center mb-8">
            <div className="mx-auto bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-600/30">
              <Briefcase className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Sign in to your inventory dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Email Address"
              type="email" 
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</button>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={loading}>
              Sign In <ArrowRight size={18} />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <button onClick={() => navigateTo('signup')} className="text-blue-600 font-medium hover:text-blue-700 hover:underline">
              Create Account
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const { navigateTo, login } = useApp();
  const [role, setRole] = useState<'Manager' | 'Seller'>('Manager');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    login('newuser@example.com', role);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-4">
       <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/30 blur-[100px] animate-pulse" />
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/30 blur-[100px] animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="p-8 backdrop-blur-sm bg-white/95 shadow-2xl border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-500 mt-2">Join to manage your inventory efficiently</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" placeholder="John" required />
              <Input label="Last Name" placeholder="Doe" required />
            </div>
            
            <Input label="Email Address" type="email" placeholder="john@example.com" required />
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('Manager')}
                  className={`p-3 text-sm font-medium rounded-lg border text-center transition-all ${role === 'Manager' ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  Manager
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Seller')}
                  className={`p-3 text-sm font-medium rounded-lg border text-center transition-all ${role === 'Seller' ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  Seller
                </button>
              </div>
            </div>

            <Input label="Password" type="password" placeholder="Min. 8 characters" required />
            <Input label="Confirm Password" type="password" placeholder="Re-enter password" required />

            <Button type="submit" className="w-full mt-2" size="lg" isLoading={loading}>
              Get Started
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <button onClick={() => navigateTo('login')} className="text-blue-600 font-medium hover:text-blue-700 hover:underline">
              Log In
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};