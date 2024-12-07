import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  file: File;
  onRemove: () => void;
  index: number;
}

export default function UploadPreview({ file, onRemove, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="relative group aspect-square"
    >
      <img
        src={URL.createObjectURL(file)}
        alt={`Upload ${index + 1}`}
        className="w-full h-full object-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 transform hover:scale-110"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </motion.div>
  );
}