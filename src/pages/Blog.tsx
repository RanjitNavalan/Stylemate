import { useState } from 'react';
import { motion } from 'framer-motion';
import BlogHeader from '../components/blog/BlogHeader';
import BlogGrid from '../components/blog/BlogGrid';
import TrendingTopics from '../components/blog/TrendingTopics';
import UserStories from '../components/blog/UserStories';
import Newsletter from '../components/blog/Newsletter';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50">
      <BlogHeader />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <TrendingTopics onSelectCategory={setSelectedCategory} />
          <BlogGrid category={selectedCategory} />
          <UserStories />
          <Newsletter />
        </motion.div>
      </div>
    </div>
  );
}