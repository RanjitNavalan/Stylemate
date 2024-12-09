import Select from 'react-select';
import { SparklesIcon, HeartIcon, StarIcon, FireIcon } from '@heroicons/react/24/solid';

interface Props {
  gender: 'male' | 'female';
  preferences: {
    style: string;
    occasion: string;
    colors: string[];
    bodyType: string;
  };
  setPreferences: (prefs: any) => void;
}

const styles = {
  male: [
    { value: 'casual', label: '😎 Super Casual Vibes' },
    { value: 'business', label: '💼 Boss Mode' },
    { value: 'streetwear', label: '🔥 Street Swagger' },
    { value: 'formal', label: '✨ Dapper & Sharp' },
    { value: 'athletic', label: '💪 Sporty Flex' },
  ],
  female: [
    { value: 'casual', label: '✌️ Effortlessly Cool' },
    { value: 'bohemian', label: '🌸 Boho Dreams' },
    { value: 'classic', label: '👑 Timeless Queen' },
    { value: 'streetwear', label: '⚡ Street Chic' },
    { value: 'romantic', label: '💖 Romance & Flair' },
  ],
};

const occasions = [
  { value: 'casual', label: '🌟 Living Your Best Life' },
  { value: 'work', label: '💼 Werk It!' },
  { value: 'party', label: '🎉 Party Time!' },
  { value: 'formal', label: '✨ Fancy Schmancy' },
  { value: 'date', label: '💖 Date Night Magic' },
];

const colorPalettes = [
  { value: 'neutral', label: '🤍 Cool Neutrals (Beige, White, Gray)' },
  { value: 'warm', label: '🔥 Hot & Spicy (Red, Orange, Yellow)' },
  { value: 'cool', label: '❄️ Chill Vibes (Blue, Purple, Green)' },
  { value: 'pastel', label: '🌸 Sweet Dreams (Soft, Light Colors)' },
  { value: 'monochrome', label: '🖤 Classic Mono (Black & White)' },
];

const bodyTypes = {
  male: [
    { value: 'ectomorph', label: '🌟 Lean & Mean' },
    { value: 'mesomorph', label: '💪 Strong & Stunning' },
    { value: 'endomorph', label: '✨ Bold & Beautiful' },
  ],
  female: [
    { value: 'hourglass', label: '⌛ Hourglass Hottie' },
    { value: 'pear', label: '🍐 Pear Perfect' },
    { value: 'apple', label: '🍎 Apple Amazing' },
    { value: 'rectangle', label: '📏 Rectangle Radiance' },
    { value: 'inverted-triangle', label: '🔻 Triangle Trendy' },
  ],
};

const SectionTitle = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-3">
    <Icon className="h-6 w-6 text-pink-500" />
    <h3 className="text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
      {children}
    </h3>
  </div>
);

export default function StylingSection({ gender, preferences, setPreferences }: Props) {
  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: 'white',
      borderColor: '#e2e8f0',
      borderRadius: '1rem',
      padding: '4px',
      boxShadow: '0 0 0 2px rgba(199, 210, 254, 0.3)',
      '&:hover': {
        borderColor: '#805ad5',
        boxShadow: '0 0 0 3px rgba(199, 210, 254, 0.5)',
      },
    }),
    option: (base: any, state: { isSelected: boolean }) => ({
      ...base,
      backgroundColor: state.isSelected ? '#805ad5' : base.backgroundColor,
      borderRadius: '0.5rem',
      margin: '2px',
      '&:hover': {
        backgroundColor: state.isSelected ? '#805ad5' : '#f3f4f6',
        transform: 'scale(1.02)',
        transition: 'all 0.2s ease',
      },
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: '1rem',
      padding: '8px',
      backgroundColor: 'white',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    }),
  };

  return (
    <div className="space-y-8 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-purple-100">
      <div className="flex items-center justify-center gap-3 mb-8">
        <SparklesIcon className="h-8 w-8 text-pink-500 animate-pulse" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          Your Fabulous Style Profile
        </h2>
        <SparklesIcon className="h-8 w-8 text-indigo-500 animate-pulse" />
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <SectionTitle icon={StarIcon}>Express Your Style ✨</SectionTitle>
          <Select
            options={styles[gender]}
            value={styles[gender].find(s => s.value === preferences.style)}
            onChange={(option) => setPreferences({ ...preferences, style: option?.value })}
            styles={customSelectStyles}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <SectionTitle icon={FireIcon}>Where Are You Headed? 🎉</SectionTitle>
          <Select
            options={occasions}
            value={occasions.find(o => o.value === preferences.occasion)}
            onChange={(option) => setPreferences({ ...preferences, occasion: option?.value })}
            styles={customSelectStyles}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <SectionTitle icon={HeartIcon}>Your Vibe Colors 🌈</SectionTitle>
          <Select
            isMulti
            options={colorPalettes}
            value={colorPalettes.filter(c => preferences.colors.includes(c.value))}
            onChange={(options) => setPreferences({ 
              ...preferences, 
              colors: options.map(o => o.value) 
            })}
            styles={customSelectStyles}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <SectionTitle icon={StarIcon}>Your Gorgeous Shape 💫</SectionTitle>
          <Select
            options={bodyTypes[gender]}
            value={bodyTypes[gender].find(b => b.value === preferences.bodyType)}
            onChange={(option) => setPreferences({ ...preferences, bodyType: option?.value })}
            styles={customSelectStyles}
          />
        </div>
      </div>
    </div>
  );
}