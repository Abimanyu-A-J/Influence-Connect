import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { AuthForm } from '../../components/auth/AuthForm';

export function LoginPage() {
  const handleLogin = (email: string, password: string) => {
    // Database: Handle user login
    console.log('Login:', email, password);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <AuthForm type="login" onSubmit={handleLogin} />
        </div>
      </div>
    </Layout>
  );
}