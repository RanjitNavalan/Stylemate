import { motion } from 'framer-motion';

export default function BlogHeader() {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-violet-500 text-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold">StyleMate Blog</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover the latest fashion trends, style tips, and AI-powered fashion insights
          </p>
        </motion.div>
      </div>
    </div>
  );
}