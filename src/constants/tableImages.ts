// The base URL for your Supabase Storage bucket
const STORAGE_URL = 'https://rlqxhxpxfbfkbgktzjnk.supabase.co/storage/v1/object/public/pool-tables/';

export const tableImages = {
  easy: [
    `${STORAGE_URL}ea-1.jpg`,
    `${STORAGE_URL}ea-2.jpg`,
    `${STORAGE_URL}ea-3.jpg`
  ],
  intermediate: [
    `${STORAGE_URL}in-1.jpg`,
    `${STORAGE_URL}in-2.jpg`,
    `${STORAGE_URL}in-3.jpg`,
    `${STORAGE_URL}in-4.jpg`,
    `${STORAGE_URL}in-5.jpg`
  ],
  advanced: [
    `${STORAGE_URL}ad-1.jpg`,
    `${STORAGE_URL}ad-2.jpg`,
    `${STORAGE_URL}ad-3.jpg`
  ],
  expert: [
    `${STORAGE_URL}ex-1.jpg`,
    `${STORAGE_URL}ex-2.jpg`,
    `${STORAGE_URL}ex-3.jpg`
  ]
};

export const getRandomTable = (difficulty: keyof typeof tableImages, usedTables: string[]) => {
  const availableTables = tableImages[difficulty].filter(table => !usedTables.includes(table));
  
  // If all tables have been used, reset the used tables list and return a random table
  if (availableTables.length === 0) {
    console.log(`All ${difficulty} tables have been used. Resetting selection pool.`);
    return tableImages[difficulty][0];
  }
  
  // Get a random table from the available ones
  const randomIndex = Math.floor(Math.random() * availableTables.length);
  const selectedTable = availableTables[randomIndex];
  
  console.log(`Selected ${difficulty} table: ${selectedTable}`);
  console.log(`Remaining unused tables: ${availableTables.length - 1}`);
  
  return selectedTable;
};