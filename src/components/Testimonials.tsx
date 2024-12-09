import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Archana Ranjith',
    role: 'Fashion Blogger',
    content: 'StyleMate has completely transformed how I put together outfits. It\'s like having a personal stylist in my pocket!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    name: 'Michael Chen',
    role: 'Professional',
    content: 'I used to struggle with matching clothes, but StyleMate makes it so easy. The AI recommendations are spot-on!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  },
  {
    name: 'Emma Williams',
    role: 'Student',
    content: 'As a student, I love how StyleMate helps me create new looks from my existing wardrobe. It\'s sustainable and fun!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  },
];

export default function Testimonials() {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          What Our Users Say
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-pink-50 to-violet-50 p-6 rounded-2xl"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
              <div className="text-center">
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}