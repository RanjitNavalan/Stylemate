import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, BeakerIcon, XMarkIcon } from '@heroicons/react/24/outline';
import StyleLabMenu from './StyleLabMenu';
import StyleLabContent from './StyleLabContent';
import Tooltip from './Tooltip';

export default function StyleLab() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'quiz' | 'mix-match' | null>(null);

  return (
    <>
      <Tooltip content="✨ Open StyleLab - Your Fashion Playground!" position="left">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-violet-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
        >
          <BeakerIcon className="h-6 w-6" />
        </motion.button>
      </Tooltip>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-10 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="h-6 w-6 text-pink-500" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                      StyleLab
                    </h2>
                  </div>
                  <Tooltip content="Close StyleLab" position="left">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                  </Tooltip>
                </div>

                <div className="flex-1 overflow-hidden flex">
                  <StyleLabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
                  <StyleLabContent activeTab={activeTab} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}