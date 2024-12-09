import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface StyleMateDB extends DBSchema {
  'style-preferences': {
    key: string;
    value: {
      userId: string;
      gender: 'male' | 'female';
      style: string;
      occasion: string;
      colors: string[];
      bodyType: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
  'saved-looks': {
    key: string;
    value: {
      id: string;
      userId: string;
      title: string;
      description: string;
      images: string[];
      tags: string[];
      likes: number;
      createdAt: Date;
    };
    indexes: { 'by-user': string };
  };
}

let db: IDBPDatabase<StyleMateDB>;

export async function initDB() {
  db = await openDB<StyleMateDB>('stylemate-db', 1, {
    upgrade(db) {
      // Style preferences store
      if (!db.objectStoreNames.contains('style-preferences')) {
        db.createObjectStore('style-preferences');
      }

      // Saved looks store with index
      if (!db.objectStoreNames.contains('saved-looks')) {
        const savedLooksStore = db.createObjectStore('saved-looks', {
          keyPath: 'id'
        });
        savedLooksStore.createIndex('by-user', 'userId');
      }
    },
  });
  return db;
}

// Style Preferences Operations
export async function saveStylePreferences(userId: string, preferences: any) {
  const db = await initDB();
  const data = {
    userId,
    ...preferences,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await db.put('style-preferences', data, userId);
  return data;
}

export async function getStylePreferences(userId: string) {
  const db = await initDB();
  return await db.get('style-preferences', userId);
}

// Saved Looks Operations
export async function saveLook(userId: string, lookData: any) {
  const db = await initDB();
  const look = {
    id: crypto.randomUUID(),
    userId,
    ...lookData,
    createdAt: new Date(),
  };
  await db.put('saved-looks', look);
  return look;
}

export async function getSavedLooks(userId: string) {
  const db = await initDB();
  const tx = db.transaction('saved-looks', 'readonly');
  const index = tx.store.index('by-user');
  return await index.getAll(userId);
}

export async function deleteLook(id: string) {
  const db = await initDB();
  await db.delete('saved-looks', id);
}

export async function updateLook(id: string, updates: Partial<StyleMateDB['saved-looks']['value']>) {
  const db = await initDB();
  const look = await db.get('saved-looks', id);
  if (!look) throw new Error('Look not found');
  
  const updatedLook = {
    ...look,
    ...updates,
  };
  await db.put('saved-looks', updatedLook);
  return updatedLook;
}