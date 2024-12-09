import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <Link to="/" className="bg-white text-indigo-600 px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  );
}