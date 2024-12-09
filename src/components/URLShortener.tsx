import { useState } from 'react';

interface Props {
  onShorten: (url: string) => Promise<void>;
}

export default function URLShortener({ onShorten }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onShorten(url);
      setUrl('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
      <div className="flex gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your URL here"
          className="flex-1 px-4 py-3 rounded-lg border-2 border-transparent focus:border-indigo-300 focus:ring-0"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-700 text-white px-8 py-3 rounded-lg hover:bg-indigo-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </div>
    </form>
  );
}