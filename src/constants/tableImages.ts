import { supabase } from '@/lib/supabase';

// Get public URLs for images using Supabase client
const getPublicUrl = (path: string) => {
  const { data } = supabase.storage.from('pool-tables').getPublicUrl(path);
  return data.publicUrl;
};

export const tableImages = {
  easy: [
    getPublicUrl('ea-1.jpg'),
    getPublicUrl('ea-2.jpg'),
    getPublicUrl('ea-3.jpg')
  ],
  intermediate: [
    getPublicUrl('in-1.jpg'),
    getPublicUrl('in-2.jpg'),
    getPublicUrl('in-3.jpg'),
    getPublicUrl('in-4.jpg'),
    getPublicUrl('in-5.jpg')
  ],
  advanced: [
    getPublicUrl('ad-1.jpg'),
    getPublicUrl('ad-2.jpg'),
    getPublicUrl('ad-3.jpg')
  ],
  expert: [
    getPublicUrl('ex-1.jpg'),
    getPublicUrl('ex-2.jpg'),
    getPublicUrl('ex-3.jpg')
  ]
};

export const getRandomTable = (difficulty: keyof typeof tableImages, usedTables: string[]) => {
  const availableTables = tableImages[difficulty].filter(table => !usedTables.includes(table));
  
  if (availableTables.length === 0) {
    console.log(`All ${difficulty} tables have been used. Resetting selection pool.`);
    return tableImages[difficulty][0];
  }
  
  const randomIndex = Math.floor(Math.random() * availableTables.length);
  const selectedTable = availableTables[randomIndex];
  
  console.log(`Selected ${difficulty} table: ${selectedTable}`);
  console.log(`Remaining unused tables: ${availableTables.length - 1}`);
  
  return selectedTable;
};