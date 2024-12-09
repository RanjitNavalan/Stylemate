import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NewspaperIcon, SparklesIcon, FireIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Style Blog',
    description: 'Discover the latest fashion trends, style tips, and inspiration from our community.',
    icon: NewspaperIcon,
    to: '/blog',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    title: 'Vibe Check',
    description: 'Test your style knowledge and see if your fashion game is on point! ✨',
    icon: FireIcon,
    to: '/vibe-check',
    gradient: 'from-violet-500 to-purple-500'
  }
];

export default function TrendZone() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <SparklesIcon className="h-8 w-8 text-pink-500 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
              Trend Zone
            </h1>
            <SparklesIcon className="h-8 w-8 text-violet-500 animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg">
            Explore the latest trends and test your style knowledge
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <Link to={feature.to}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className={`bg-gradient-to-r ${feature.gradient} p-6 text-white`}>
                    <feature.icon className="h-12 w-12 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">{feature.title}</h2>
                    <p className="text-white/90">{feature.description}</p>
                  </div>
                  <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                    <span className="inline-flex items-center text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                      Explore {feature.title}
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}