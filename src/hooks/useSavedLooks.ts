import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getSavedLooks, saveLook, deleteLook, updateLook } from '../lib/db';
import toast from 'react-hot-toast';

export function useSavedLooks() {
  const { user } = useAuth();
  const [looks, setLooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadLooks() {
      if (!user) return;
      
      try {
        const userLooks = await getSavedLooks(user.id);
        setLooks(userLooks);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load looks'));
      } finally {
        setLoading(false);
      }
    }

    loadLooks();
  }, [user]);

  const addLook = async (lookData: any) => {
    if (!user) return;

    try {
      const newLook = await saveLook(user.id, lookData);
      setLooks(prev => [...prev, newLook]);
      toast.success('Look saved successfully! ✨');
      return newLook;
    } catch (err) {
      toast.error('Failed to save look');
      throw err;
    }
  };

  const removeLook = async (id: string) => {
    try {
      await deleteLook(id);
      setLooks(prev => prev.filter(look => look.id !== id));
      toast.success('Look removed successfully');
    } catch (err) {
      toast.error('Failed to remove look');
      throw err;
    }
  };

  const updateLookById = async (id: string, updates: any) => {
    try {
      const updatedLook = await updateLook(id, updates);
      setLooks(prev => prev.map(look => 
        look.id === id ? updatedLook : look
      ));
      toast.success('Look updated successfully ✨');
      return updatedLook;
    } catch (err) {
      toast.error('Failed to update look');
      throw err;
    }
  };

  return { looks, loading, error, addLook, removeLook, updateLookById };
}