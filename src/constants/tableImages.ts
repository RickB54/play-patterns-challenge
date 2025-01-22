// The base URL for your Supabase Storage bucket
const STORAGE_URL = 'https://YOUR_PROJECT_URL.supabase.co/storage/v1/object/public/pool-tables/';

export const tableImages = {
  easy: [
    `${STORAGE_URL}easy-1.jpg`,
    `${STORAGE_URL}easy-2.jpg`,
    `${STORAGE_URL}easy-3.jpg`
  ],
  intermediate: [
    `${STORAGE_URL}intermediate-1.jpg`,
    `${STORAGE_URL}intermediate-2.jpg`,
    `${STORAGE_URL}intermediate-3.jpg`,
    `${STORAGE_URL}intermediate-4.jpg`,
    `${STORAGE_URL}intermediate-5.jpg`
  ],
  advanced: [
    `${STORAGE_URL}advanced-1.jpg`,
    `${STORAGE_URL}advanced-2.jpg`,
    `${STORAGE_URL}advanced-3.jpg`
  ],
  expert: [
    `${STORAGE_URL}expert-1.jpg`,
    `${STORAGE_URL}expert-2.jpg`,
    `${STORAGE_URL}expert-3.jpg`
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