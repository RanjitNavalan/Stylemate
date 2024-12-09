import { motion } from 'framer-motion';
import { userStories } from '../../data/blogPosts';

export default function UserStories() {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold text-center">StyleMate Stories</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {userStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={story.author.avatar} 
                alt={story.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{story.author.name}</h3>
                <p className="text-sm text-gray-500">{story.date}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{story.content}</p>
            {story.image && (
              <img 
                src={story.image} 
                alt="Style transformation"
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}