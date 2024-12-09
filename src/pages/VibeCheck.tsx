import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { SparklesIcon, FireIcon, HeartIcon } from '@heroicons/react/24/solid';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  emoji: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Spill the tea! Which fit is giving main character energy?",
    options: ["Y2K vibes", "Core aesthetics", "Clean girl", "Dark academia"],
    correct: 1,
    emoji: "✨"
  },
  {
    id: 2,
    question: "No cap - how do you layer these pieces?",
    options: ["Oversized on oversized", "Crop it like it's hot", "Mix textures", "Keep it basic"],
    correct: 2,
    emoji: "🔥"
  },
  {
    id: 3,
    question: "This accessory is bussin' fr fr:",
    options: ["Pearl necklace", "Platform boots", "Mini bag", "Hair clips"],
    correct: 1,
    emoji: "💅"
  }
];

export default function VibeCheck() {
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
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 py-12">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3">
              <FireIcon className="h-8 w-8 text-pink-500 animate-pulse" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                Vibe Check
              </h1>
              <SparklesIcon className="h-8 w-8 text-violet-500 animate-pulse" />
            </div>
            <p className="text-gray-600 mt-2">
              Let's see if your style game is on point! 💁‍♀️
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
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
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                        }}
                        className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500"
                      />
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <span className="text-4xl mb-4 block">
                      {questions[currentQuestion].emoji}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {questions[currentQuestion].question}
                    </h2>
                  </div>

                  <div className="grid gap-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(index)}
                        className="w-full p-4 text-left rounded-xl bg-gradient-to-r from-pink-50 to-violet-50 hover:from-pink-100 hover:to-violet-100 transition-all"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-pink-500 font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </span>
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
                  <div className="space-y-4">
                    <HeartIcon className="h-16 w-16 text-pink-500 mx-auto" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                      {score === questions.length ? "Period! You ate! 💅" :
                       score >= questions.length / 2 ? "Not me being impressed! ✨" :
                       "Keep slaying bestie! 💖"}
                    </h2>
                    <p className="text-2xl font-bold">
                      Your Score: {score} / {questions.length}
                    </p>
                    <p className="text-gray-600">
                      {score === questions.length ? "Your style game is literally everything!" :
                       score >= questions.length / 2 ? "You're giving what needs to be gave!" :
                       "A little more practice and you'll be that girl!"}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetQuiz}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
                  >
                    Slay Again! ✨
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}