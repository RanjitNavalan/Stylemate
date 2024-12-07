import { motion } from 'framer-motion';
import { PuzzlePieceIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Tooltip from './Tooltip';

interface Props {
  activeTab: 'mix-match' | null;
  setActiveTab: (tab: 'mix-match') => void;
}

const menuItems = [
  {
    id: 'mix-match',
    name: 'Style Mixer',
    description: 'Create amazing outfit combinations',
    tooltip: '✨ Mix & match your wardrobe pieces to create stunning outfits!',
    icon: PuzzlePieceIcon,
    gradient: 'from-pink-500 to-rose-500'
  }
];

export default function StyleLabMenu({ activeTab, setActiveTab }: Props) {
  return (
    <div className="w-80 border-r bg-gray-50 p-6">
      <div className="space-y-6">
        {menuItems.map((item) => (
          <Tooltip key={item.id} content={item.tooltip} position="right">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id as 'mix-match')}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 text-gray-800 shadow'
              }`}
            >
              <div className="flex items-start gap-4">
                <item.icon className={`h-6 w-6 ${
                  activeTab === item.id ? 'text-white' : 'text-gray-400'
                }`} />
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {item.name}
                    {activeTab === item.id && (
                      <SparklesIcon className="h-4 w-4 animate-pulse" />
                    )}
                  </h3>
                  <p className={`text-sm ${
                    activeTab === item.id ? 'text-white/90' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}