import { useCallback } from 'react';
import { motion } from 'framer-motion';
import UploadZone from './upload/UploadZone';
import UploadPreview from './upload/UploadPreview';
import { CameraIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface Props {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUploader({ images, setImages }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages(prevImages => [...prevImages, ...acceptedFiles]);
  }, [setImages]);

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <CameraIcon className="h-8 w-8 text-pink-500 animate-pulse" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            Click a Selfie ✨
          </h2>
          <SparklesIcon className="h-8 w-8 text-violet-500 animate-pulse" />
        </div>
        <p className="text-gray-600">
          Let's capture your style! Take a selfie or upload your favorite outfit pics
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
        <UploadZone onDrop={onDrop} isDragActive={false} />

        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-pink-500" />
                Your Fabulous Pics ({images.length})
              </h3>
              <button
                onClick={() => setImages([])}
                className="text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((file, index) => (
                <UploadPreview
                  key={index}
                  file={file}
                  index={index}
                  onRemove={() => removeImage(index)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}