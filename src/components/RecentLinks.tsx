interface Props {
  links: Array<{ short: string; original: string }>;
}

export default function RecentLinks({ links }: Props) {
  if (links.length === 0) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-white mb-4">Recent Links</h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {links.map((link, index) => (
          <div
            key={index}
            className="p-4 flex flex-col sm:flex-row sm:items-center gap-2 border-b last:border-b-0"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500 truncate">{link.original}</p>
              <p className="text-indigo-600 font-medium">{window.location.origin}/{link.short}</p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${link.short}`)}
              className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}