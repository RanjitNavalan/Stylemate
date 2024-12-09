import { motion } from 'framer-motion';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Hero() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/style-input');
    } else {
      navigate('/style-input');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
      <div className="container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            Welcome to StyleMate
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your AI-powered personal stylist that transforms your wardrobe into endless possibilities
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-all"
          >
            Get Started
          </button>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDownIcon className="h-8 w-8 text-gray-500" />
        </motion.div>
      </div>
    </div>
  );
}