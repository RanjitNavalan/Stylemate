import OpenAI from 'openai';
import axios from 'axios';
import toast from 'react-hot-toast';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateOutfitSuggestions(
  imageFile: File,
  preferences: {
    gender: string;
    style: string;
    occasion: string;
    colors: string[];
    bodyType: string;
  }
) {
  try {
    console.log('Starting generation with preferences:', preferences);
    console.log('Image file:', imageFile);
    
    // Convert File to base64
    const imageBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Image converted to base64');
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsDataURL(imageFile);
    });

    console.log('Preparing OpenAI request...');
    
    // Generate a detailed prompt based on the preferences
    const prompt = `Create a high-quality, photorealistic outfit image with the following specifications:

    Base Style: ${preferences.style}
    Occasion: ${preferences.occasion}
    Gender: ${preferences.gender}
    Body Type: ${preferences.bodyType}
    Color Palette: ${preferences.colors.join(', ')}

    The outfit should be:
    - Perfectly styled for ${preferences.occasion}
    - Flattering for ${preferences.bodyType} body type
    - Incorporating the colors: ${preferences.colors.join(', ')}
    - Following ${preferences.style} aesthetic
    - Shown on a clean, white background
    - Include accessories and styling details
    - High-fashion quality
    - Photorealistic and detailed

    Make it trendy, fashionable, and ready-to-wear.`;

    console.log('Sending request to OpenAI...');
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "natural",
      response_format: "b64_json"
    });

    console.log('Received response from OpenAI');

    if (!response.data[0]?.b64_json) {
      console.error('No image data in response:', response);
      throw new Error('Failed to generate outfit image');
    }

    // Convert base64 to image URL
    const imageData = response.data[0].b64_json;
    const imageUrl = `data:image/png;base64,${imageData}`;

    console.log('Successfully generated image');

    // Generate a personalized description
    const description = `✨ Perfect Match Alert! ✨

Here's your personalized ${preferences.style} ensemble for ${preferences.occasion}!

This carefully curated outfit is designed to:
• Flatter your ${preferences.bodyType} body type
• Express your unique ${preferences.style} style
• Incorporate your favorite colors: ${preferences.colors.join(', ')}
• Make you feel confident and stylish for ${preferences.occasion}

Style Tips:
• Accessorize with minimal jewelry for a clean look
• Layer pieces for dimension and versatility
• Choose shoes that complement the overall aesthetic

Feel amazing in this perfectly tailored look! 💫`;

    return {
      imageUrl, // This is now a data URL containing the image data
      description
    };
  } catch (error) {
    console.error('Detailed error in generateOutfitSuggestions:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        toast.error('Authentication error. Please check API configuration.');
      } else if (error.message.includes('timeout')) {
        toast.error('Request timed out. Please try again.');
      } else {
        toast.error('Failed to generate suggestions. Please try again.');
      }
    } else {
      toast.error('An unexpected error occurred');
    }

    throw error;
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}