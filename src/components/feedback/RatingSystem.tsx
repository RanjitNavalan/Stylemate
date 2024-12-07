import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

interface Props {
  onRate: (rating: number) => void;
}

export default function RatingSystem({ onRate }: Props) {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const handleRate = (value: number) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Rate this Look</h3>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform hover:scale-110"
          >
            {star <= (hover || rating) ? (
              <StarIcon className="h-8 w-8 text-pink-500" />
            ) : (
              <StarOutline className="h-8 w-8 text-pink-500" />
            )}
          </button>
        ))}
      </div>
      {rating > 0 && (
        <p className="text-sm text-gray-600">
          Thanks for rating! Your feedback helps us improve.
        </p>
      )}
    </div>
  );
}