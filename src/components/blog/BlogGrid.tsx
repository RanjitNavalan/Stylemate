import { motion } from 'framer-motion';
import { blogPosts } from '../../data/blogPosts';

interface Props {
  category: string;
}

export default function BlogGrid({ category }: Props) {
  const filteredPosts = category === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === category);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {filteredPosts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <span className="text-sm text-pink-500">{post.category}</span>
            <h3 className="text-xl font-semibold mt-2 mb-3">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-500">{post.author.name}</span>
              </div>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}