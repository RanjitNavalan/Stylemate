import { motion } from 'framer-motion';

interface Props {
  gender: 'male' | 'female';
  setGender: (gender: 'male' | 'female') => void;
}

export default function GenderSelector({ gender, setGender }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Choose Your Gender</h2>
      
      <div className="flex gap-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGender('female')}
          className={`flex-1 p-6 rounded-xl text-center transition-colors ${
            gender === 'female'
              ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="text-xl font-medium">Female</span>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGender('male')}
          className={`flex-1 p-6 rounded-xl text-center transition-colors ${
            gender === 'male'
              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="text-xl font-medium">Male</span>
        </motion.button>
      </div>
    </div>
  );
}