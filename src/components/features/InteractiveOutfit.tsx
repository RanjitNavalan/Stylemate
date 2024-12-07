import { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface ClothingItem {
  id: string;
  type: string;
  image: string;
  name: string;
}

const sampleItems: ClothingItem[] = [
  {
    id: '1',
    type: 'top',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    name: 'Classic White Tee'
  },
  {
    id: '2',
    type: 'bottom',
    image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a',
    name: 'Blue Jeans'
  },
  {
    id: '3',
    type: 'accessory',
    image: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427',
    name: 'Gold Necklace'
  }
];

export default function InteractiveOutfit() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const mixAndMatch = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
    const randomItems = sampleItems
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(item => item.id);
    setSelectedItems(randomItems);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text mb-2">
          Mix & Match Magic
        </h3>
        <p className="text-gray-600">Create your perfect outfit combination</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {sampleItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative cursor-pointer rounded-xl overflow-hidden shadow-md
              ${selectedItems.includes(item.id) ? 'ring-4 ring-pink-500' : ''}`}
            onClick={() => toggleItem(item.id)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-medium">{item.name}</p>
              <p className="text-white/80 text-sm">{item.type}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={mixAndMatch}
          className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-8 py-3 rounded-full inline-flex items-center gap-2"
        >
          <SparklesIcon className={`h-5 w-5 ${isAnimating ? 'animate-spin' : ''}`} />
          Surprise Me!
        </motion.button>
      </div>
    </div>
  );
}