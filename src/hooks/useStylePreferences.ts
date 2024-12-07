import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { saveStylePreferences, getStylePreferences } from '../lib/db';

export function useStylePreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadPreferences() {
      if (!user) return;
      
      try {
        const userPreferences = await getStylePreferences(user.id);
        setPreferences(userPreferences);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load preferences'));
      } finally {
        setLoading(false);
      }
    }

    loadPreferences();
  }, [user]);

  const updatePreferences = async (newPreferences: any) => {
    if (!user) return;

    try {
      const updated = await saveStylePreferences(user.id, newPreferences);
      setPreferences(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save preferences'));
      throw err;
    }
  };

  return { preferences, loading, error, updatePreferences };
}