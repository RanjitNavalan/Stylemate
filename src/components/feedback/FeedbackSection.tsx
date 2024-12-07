import { useState } from 'react';
import { motion } from 'framer-motion';
import RatingSystem from './RatingSystem';
import QuickSurvey from './QuickSurvey';

interface Props {
  onFeedbackComplete: () => void;
}

export default function FeedbackSection({ onFeedbackComplete }: Props) {
  const [showSurvey, setShowSurvey] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleRating = (rating: number) => {
    setShowSurvey(true);
  };

  const handleSurveyComplete = (answers: Record<number, string>) => {
    // Here you would typically send the feedback to your backend
    console.log('Survey completed:', answers);
    setFeedbackSubmitted(true);
    onFeedbackComplete();
  };

  if (feedbackSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Thank You for Your Feedback! 🎉
        </h3>
        <p className="text-gray-600">
          Your input helps us create better style recommendations for you.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-pink-50 to-violet-50 p-8 rounded-2xl shadow-lg space-y-8">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
        Help Us Style Better! ✨
      </h2>

      {!showSurvey ? (
        <RatingSystem onRate={handleRating} />
      ) : (
        <QuickSurvey onComplete={handleSurveyComplete} />
      )}
    </div>
  );
}