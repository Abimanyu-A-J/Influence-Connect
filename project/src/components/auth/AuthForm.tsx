import React, { useState } from 'react';
import { UserType } from '@/types';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (username: string, password: string, userType?: UserType) => void;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [username, setUsername] = useState('');
  const [id, setid] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('influencer');
  const navigator = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"username": username,"password": password}),
      });

      if (!response.ok) {
        console.log(response);
      }

      const data = await response.json();
      if(data.message == "Login successful") {
        navigator("/dashboard");
      } else {
        alert(data.message);
      }
      // Handle successful login (e.g., store user data, redirect, etc.)
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"username": username,"password": password, "role": userType}),
      });

      if (!response.ok) {
        console.log(response);
      }

      const data = await response.json();
      if(data.message == "User created successfully") {
        navigator("/dashboard");
      } else {
        alert(data.message);
      }
      // Handle successful login (e.g., store user data, redirect, etc.)
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password, type === 'register' ? userType : undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">User Name </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      {type === 'register' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">I am a:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as UserType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Influencer">Influencer</option>
            <option value="Sponsor">Sponsor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      )}
      <button
        type="submit"
        onClick={type === 'login'?handleLogin:handleRegister}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {type === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
}