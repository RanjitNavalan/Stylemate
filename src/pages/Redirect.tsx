import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOriginalUrl } from '../lib/api';

export default function Redirect() {
  const { shortId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      try {
        if (!shortId) throw new Error('Invalid short URL');
        const originalUrl = await getOriginalUrl(shortId);
        window.location.href = originalUrl;
      } catch (error) {
        navigate('/404');
      }
    };
    redirect();
  }, [shortId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}