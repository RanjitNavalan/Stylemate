import { motion } from 'framer-motion';

interface Props {
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Posts', emoji: '✨' },
  { id: 'tips', name: 'Style Tips', emoji: '💡' },
  { id: 'trends', name: 'Seasonal Trends', emoji: '🌟' },
  { id: 'ai', name: 'AI & Fashion', emoji: '🤖' },
  { id: 'stories', name: 'User Stories', emoji: '👗' },
];

export default function TrendingTopics({ onSelectCategory }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Trending Topics</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(category.id)}
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <span className="mr-2">{category.emoji}</span>
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}