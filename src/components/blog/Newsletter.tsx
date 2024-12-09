import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="bg-gradient-to-r from-pink-500 to-violet-500 p-12 rounded-2xl text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <h2 className="text-2xl font-bold">Stay Stylish & Updated!</h2>
        <p className="text-white/90">
          Subscribe to our newsletter for the latest fashion tips, trends, and AI insights.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-800"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-white text-pink-500 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  );
}