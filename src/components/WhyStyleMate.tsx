import { features } from '../data/features';
import FeatureCard from './features/FeatureCard';

export default function WhyStyleMate() {
  return (
    <div className="bg-gradient-to-r from-violet-100 to-pink-100 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          Why StyleMate?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}