import { motion } from 'framer-motion';
import { 
  UserCircleIcon, 
  HeartIcon, 
  ChartBarIcon,
  Squares2X2Icon 
} from '@heroicons/react/24/outline';

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-8">
            <div className="flex items-center gap-4">
              <UserCircleIcon className="h-20 w-20 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">Sarah Johnson</h1>
                <p className="text-white/80">Fashion Enthusiast</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Squares2X2Icon className="h-6 w-6 text-pink-500" />
                Size Details
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Top Size</p>
                  <p className="font-medium">Medium (M)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Bottom Size</p>
                  <p className="font-medium">8 (US)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Shoe Size</p>
                  <p className="font-medium">7.5 (US)</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <HeartIcon className="h-6 w-6 text-pink-500" />
                Style Preferences
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Favorite Styles</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">Bohemian</span>
                    <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-sm">Casual Chic</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">Street Style</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Color Preferences</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">Pastels</span>
                    <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-sm">Earth Tones</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ChartBarIcon className="h-6 w-6 text-pink-500" />
                Style History
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Recent Outfits</p>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">Boho Summer Dress - Beach Day</p>
                    <p className="text-sm">Casual Office Look - Work</p>
                    <p className="text-sm">Evening Cocktail Outfit - Party</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}