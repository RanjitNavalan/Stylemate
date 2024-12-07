import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';
import StyleLabContent from '../components/stylelab/StyleLabContent';
import StyleLabMenu from '../components/stylelab/StyleLabMenu';
import { useState } from 'react';

export default function StyleLab() {
  const [activeTab, setActiveTab] = useState<'mix-match' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-6 w-6 text-pink-500" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                Style Lab
              </h2>
            </div>
          </div>

          <div className="flex min-h-[600px]">
            <StyleLabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            <StyleLabContent activeTab={activeTab} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}