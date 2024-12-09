import { motion } from 'framer-motion';
import { HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useSavedLooks } from '../hooks/useSavedLooks';
import { useAuth } from '../contexts/AuthContext';
import { SparklesIcon } from '@heroicons/react/24/solid';

export default function SavedLooks() {
  const { looks, loading, removeLook } = useSavedLooks();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!looks || looks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <SparklesIcon className="h-8 w-8 text-pink-500 animate-pulse" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
              Your Saved Looks
            </h2>
            <SparklesIcon className="h-8 w-8 text-violet-500 animate-pulse" />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
            <img
              src="https://illustrations.popsy.co/amber/fashion-shopping.svg"
              alt="No saved looks"
              className="w-64 h-64 mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Saved Looks Yet!
            </h3>
            <p className="text-gray-600 mb-6">
              Start creating your perfect looks and save them here for inspiration! ✨
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/style-input'}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full hover:shadow-lg transition-all"
            >
              Create Your First Look
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <SparklesIcon className="h-8 w-8 text-pink-500 animate-pulse" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            Your Saved Looks
          </h2>
          <SparklesIcon className="h-8 w-8 text-violet-500 animate-pulse" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {looks.map((look) => (
            <motion.div
              key={look.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative">
                <img
                  src={look.images[0]}
                  alt={look.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2 space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors"
                  >
                    <ShareIcon className="h-5 w-5 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeLook(look.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5 text-gray-600" />
                  </motion.button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{look.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{look.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {look.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(look.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1">
                    <HeartIcon className="h-5 w-5 text-pink-500" />
                    <span>{look.likes}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}