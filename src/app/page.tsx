import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Service Provider</h1>
      <p className="mb-4">This application uses SSO for authentication.</p>
      
      <Link 
        href="/login" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign In
      </Link>
    </div>
  );
}