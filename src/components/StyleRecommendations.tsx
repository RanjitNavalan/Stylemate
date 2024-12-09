import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
import SocialShare from './social/SocialShare';
import { useState, useEffect } from 'react';
import { generateOutfitSuggestions } from '../lib/openai';
import toast from 'react-hot-toast';

interface Props {
  style: string;
  occasion: string;
  userImages: File[];
  preferences: {
    gender: string;
    style: string;
    occasion: string;
    colors: string[];
    bodyType: string;
  };
}

export default function StyleRecommendations({ style, occasion, userImages, preferences }: Props) {
  const [generatedOutfit, setGeneratedOutfit] = useState<{
    imageUrl: string;
    description: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getSuggestions() {
      if (!userImages.length || !preferences) return;

      setLoading(true);
      try {
        // Show loading toast
        toast.loading('Creating your perfect outfit...', {
          duration: 3000,
        });

        console.log('Starting outfit generation with:', {
          imageDetails: {
            name: userImages[0].name,
            size: userImages[0].size,
            type: userImages[0].type
          },
          preferences
        });

        const result = await generateOutfitSuggestions(userImages[0], preferences);
        console.log('OpenAI Response:', result);

        setGeneratedOutfit(result);
        
        toast.success('Your outfit is ready! ✨', {
          duration: 3000,
        });
      } catch (error) {
        console.error('Detailed error in StyleRecommendations:', error);
        
        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error('An unexpected error occurred');
        }
        
        console.error('Full error details:', error);
      } finally {
        setLoading(false);
      }
    }

    getSuggestions();
  }, [userImages, preferences]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Creating your personalized outfit... ✨</p>
          <p className="text-sm text-gray-500">This may take a moment as we craft the perfect look for you</p>
        </div>
      </div>
    );
  }

  if (!generatedOutfit) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 p-8 rounded-2xl shadow-lg space-y-8"
    >
      <div className="flex items-center justify-center gap-3 mb-8">
        <SparklesIcon className="h-8 w-8 text-pink-500 animate-pulse" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          Your Perfect Look
        </h2>
        <SparklesIcon className="h-8 w-8 text-violet-500 animate-pulse" />
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          src={generatedOutfit.imageUrl}
          alt="Your personalized outfit"
          className="w-full rounded-xl shadow-lg mb-6"
        />
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {generatedOutfit.description}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <SocialShare
          title={`Check out my ${style} style for ${occasion} on StyleMate!`}
          description="Got amazing style recommendations from StyleMate! 🎉"
          image={generatedOutfit.imageUrl}
        />
      </div>
    </motion.div>
  );
}