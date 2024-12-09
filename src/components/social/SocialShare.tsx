import { motion } from 'framer-motion';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon
} from 'react-share';

interface Props {
  title: string;
  description: string;
  image?: string;
}

export default function SocialShare({ title, description, image }: Props) {
  const shareUrl = window.location.href;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Share Your Style</h3>
      <p className="text-gray-600 mb-6">
        Love your new look? Share it with your friends and inspire others!
      </p>
      
      <div className="flex gap-4 justify-center">
        <FacebookShareButton url={shareUrl} quote={title} className="hover:scale-110 transition-transform">
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl} title={title} className="hover:scale-110 transition-transform">
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        {image && (
          <PinterestShareButton
            url={shareUrl}
            media={image}
            description={description}
            className="hover:scale-110 transition-transform"
          >
            <PinterestIcon size={40} round />
          </PinterestShareButton>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          #StyleMate #PersonalStyle #FashionAI
        </p>
      </div>
    </motion.div>
  );
}