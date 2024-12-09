import { motion, AnimatePresence } from 'framer-motion';
import InteractiveOutfit from '../features/InteractiveOutfit';
import StyleQuiz from '../features/StyleQuiz';

interface Props {
  activeTab: 'quiz' | 'mix-match' | null;
}

export default function StyleLabContent({ activeTab }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <AnimatePresence mode="wait">
        {activeTab === 'mix-match' && (
          <motion.div
            key="mix-match"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <InteractiveOutfit />
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <StyleQuiz />
          </motion.div>
        )}

        {!activeTab && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex items-center justify-center text-center"
          >
            <div className="max-w-md space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Welcome to StyleLab! 🧪
              </h3>
              <p className="text-gray-600">
                Your fashion playground for mixing outfits and testing your style knowledge.
                Choose an activity from the menu to get started!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}