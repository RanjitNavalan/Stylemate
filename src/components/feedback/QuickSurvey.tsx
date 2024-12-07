import { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  {
    id: 1,
    question: "How well did the recommendations match your style?",
    options: ["Perfect Match", "Good Match", "Somewhat Match", "Not a Match"],
  },
  {
    id: 2,
    question: "Would you wear these combinations?",
    options: ["Definitely", "Probably", "Maybe", "No"],
  },
  {
    id: 3,
    question: "What aspects would you like to improve?",
    options: ["Color Combinations", "Style Matching", "Occasion Fit", "Accessories"],
  },
];

interface Props {
  onComplete: (answers: Record<number, string>) => void;
}

export default function QuickSurvey({ onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Quick Survey</h3>
      
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-4"
      >
        <p className="text-gray-700">{questions[currentQuestion].question}</p>
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full p-3 text-left rounded-lg bg-white border border-gray-200 hover:border-pink-500 hover:bg-pink-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>Question {currentQuestion + 1} of {questions.length}</span>
      </div>
    </div>
  );
}