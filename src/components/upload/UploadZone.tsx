import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { CameraIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface Props {
  onDrop: (files: File[]) => void;
  isDragActive: boolean;
}

export default function UploadZone({ onDrop, isDragActive }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative border-4 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
        ${isDragActive 
          ? 'border-violet-500 bg-violet-50' 
          : 'border-gray-300 hover:border-violet-400 hover:bg-violet-50/50'
        }`}
    >
      <input {...getInputProps()} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex justify-center gap-4">
          <CameraIcon className={`h-16 w-16 ${isDragActive ? 'text-violet-500' : 'text-gray-400'}`} />
          <PhotoIcon className={`h-16 w-16 ${isDragActive ? 'text-violet-500' : 'text-gray-400'}`} />
        </div>
        
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-700">
            {isDragActive ? "Drop your pics here..." : "Strike a Pose! 📸"}
          </p>
          <p className="text-sm text-gray-500">
            Snap a selfie or drop your fab photos here
          </p>
          <p className="text-xs text-gray-400">
            Accepts JPG, JPEG, PNG • Max 10MB
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full inline-flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <CameraIcon className="h-5 w-5" />
          Take a Pic
        </motion.button>
      </motion.div>
    </div>
  );
}