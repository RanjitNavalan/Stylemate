import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which color combination is perfect for a summer brunch?",
    options: ["Black & Gray", "Pastels & White", "Neon & Black", "Brown & Navy"],
    correct: 1
  },
  {
    id: 2,
    question: "What's the best way to mix patterns?",
    options: [
      "Use different scales",
      "Use same colors",
      "Keep them identical",
      "Avoid mixing patterns"
    ],
    correct: 0
  },
  {
    id: 3,
    question: "Which accessory can elevate a casual outfit?",
    options: ["Statement necklace", "Running shoes", "Baseball cap", "Gym bag"],
    correct: 0
  }
];

export default function StyleQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          Style Quiz
        </h3>
        <p className="text-gray-600">Test your fashion knowledge!</p>
      </div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-violet-500 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h4 className="text-xl font-medium text-gray-800">
              {questions[currentQuestion].question}
            </h4>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-4 text-left rounded-xl bg-violet-50 hover:bg-violet-100 transition-colors"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <h4 className="text-2xl font-bold text-gray-800">
              Quiz Complete! 🎉
            </h4>
            <p className="text-xl">
              Your Score: {score} out of {questions.length}
            </p>
            <p className="text-gray-600">
              {score === questions.length
                ? "Perfect score! You're a fashion expert! 👑"
                : score >= questions.length / 2
                ? "Great job! You know your style! ✨"
                : "Keep learning and exploring fashion! 💫"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-8 py-3 rounded-full"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}