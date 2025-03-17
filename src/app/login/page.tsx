'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSSOLogin = async () => {
    setIsLoading(true);
    router.push('/api/auth/login');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Service Provider</h1>
      <p className="mb-4">Please sign in to access the application.</p>
      
      <button
        onClick={handleSSOLogin}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isLoading ? 'Redirecting...' : 'Sign in with SSO'}
      </button>
    </div>
  );
}