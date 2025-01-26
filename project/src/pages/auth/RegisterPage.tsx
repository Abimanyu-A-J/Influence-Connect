import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { AuthForm } from '../../components/auth/AuthForm';
import type { UserType } from '../../types';

export function RegisterPage() {
  const handleRegister = (email: string, password: string, userType?: UserType) => {
    // Database: Handle user registration
    console.log('Register:', email, password, userType);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <AuthForm type="register" onSubmit={handleRegister} />
        </div>
      </div>
    </Layout>
  );
}