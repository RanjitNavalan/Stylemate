import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  icon: string;
  index: number;
}

export default function FeatureCard({ title, description, image, icon, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group rounded-2xl overflow-hidden shadow-xl"
    >
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>
      <div className="relative p-8 h-full min-h-[300px] flex flex-col justify-end text-white">
        <div className="mb-4">
          <span className="text-4xl">{icon}</span>
        </div>
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-300 to-violet-300 text-transparent bg-clip-text">
          {title}
        </h3>
        <p className="text-white/90 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}