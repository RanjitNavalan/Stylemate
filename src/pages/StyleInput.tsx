import { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
import ImageUploader from '../components/ImageUploader';
import GenderSelector from '../components/GenderSelector';
import StylingSection from '../components/StylingSection';
import StyleRecommendations from '../components/StyleRecommendations';
import FeedbackSection from '../components/feedback/FeedbackSection';
import { useAuth } from '../contexts/AuthContext';
import { useStylePreferences } from '../hooks/useStylePreferences';
import { useSavedLooks } from '../hooks/useSavedLooks';
import toast from 'react-hot-toast';

export default function StyleInput() {
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [images, setImages] = useState<File[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [stylePreferences, setStylePreferences] = useState({
    style: '',
    occasion: '',
    colors: [],
    bodyType: '',
  });

  const { user } = useAuth();
  const { updatePreferences } = useStylePreferences();
  const { addLook } = useSavedLooks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Save style preferences
      await updatePreferences({
        gender,
        ...stylePreferences,
      });

      // Create a saved look
      const imageUrls = await Promise.all(
        images.map(file => URL.createObjectURL(file))
      );

      await addLook({
        title: `${stylePreferences.style} Look for ${stylePreferences.occasion}`,
        description: `A ${stylePreferences.style} outfit perfect for ${stylePreferences.occasion} occasions`,
        images: imageUrls,
        tags: [
          gender,
          stylePreferences.style,
          stylePreferences.occasion,
          ...stylePreferences.colors,
        ],
        likes: 0,
      });

      setShowRecommendations(true);
      setShowFeedback(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      
      toast.success('Your style preferences have been saved! ✨');
    } catch (error) {
      toast.error('Failed to save your preferences');
      console.error('Error saving preferences:', error);
    }
  };

  const handleFeedbackComplete = () => {
    console.log('Feedback completed');
  };

  const isFormValid = () => {
    return (
      stylePreferences.style &&
      stylePreferences.occasion &&
      stylePreferences.colors.length > 0 &&
      stylePreferences.bodyType
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4"
      >
        <div className="flex items-center justify-center gap-3 mb-12">
          <SparklesIcon className="h-8 w-8 text-pink-500 animate-pulse" />
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            Let's Find Your Fabulous Style! ✨
          </h1>
          <SparklesIcon className="h-8 w-8 text-violet-500 animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <ImageUploader images={images} setImages={setImages} />
          <GenderSelector gender={gender} setGender={setGender} />
          <StylingSection 
            gender={gender}
            preferences={stylePreferences}
            setPreferences={setStylePreferences}
          />
          
          <div className="text-center">
            <motion.button
              type="submit"
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`bg-gradient-to-r from-pink-500 to-violet-500 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all transform hover:scale-105 group ${
                !isFormValid() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Find my StyleMate
                <SparklesIcon className="h-6 w-6 group-hover:animate-spin" />
              </span>
            </motion.button>
            {!isFormValid() && (
              <p className="text-sm text-gray-500 mt-2">
                Please fill in all style preferences to continue
              </p>
            )}
          </div>
        </div>

        {showRecommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto mt-24 space-y-12"
          >
            <StyleRecommendations
              style={stylePreferences.style}
              occasion={stylePreferences.occasion}
              userImages={images}
              preferences={{
                gender,
                ...stylePreferences
              }}
            />
            
            {showFeedback && (
              <FeedbackSection onFeedbackComplete={handleFeedbackComplete} />
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}