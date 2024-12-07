import { CloudArrowUpIcon, SparklesIcon, SwatchIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Upload Your Clothes',
    description: 'Take photos of your favorite pieces or upload existing pictures',
    icon: CloudArrowUpIcon,
  },
  {
    title: 'Get AI Recommendations',
    description: 'Our AI analyzes your style and suggests perfect combinations',
    icon: SparklesIcon,
  },
  {
    title: 'Mix and Match',
    description: 'Explore different looks and find your perfect style',
    icon: SwatchIcon,
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          How to Use StyleMate?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-6 flex justify-center">
                <step.icon className="h-16 w-16 text-violet-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}