export const tableImages = {
  easy: [
    'https://i.imgur.com/1a2b3c4.png',
    'https://i.imgur.com/2b3c4d5.png',
    'https://i.imgur.com/3c4d5e6.png'
  ],
  intermediate: [
    'https://i.imgur.com/4d5e6f7.png',
    'https://i.imgur.com/5e6f7g8.png',
    'https://i.imgur.com/6f7g8h9.png',
    'https://i.imgur.com/7g8h9i0.png',
    'https://i.imgur.com/8h9i0j1.png'
  ],
  advanced: [
    'https://i.imgur.com/9i0j1k2.png',
    'https://i.imgur.com/0j1k2l3.png',
    'https://i.imgur.com/1k2l3m4.png'
  ],
  expert: [
    'https://i.imgur.com/2l3m4n5.png',
    'https://i.imgur.com/3m4n5o6.png',
    'https://i.imgur.com/4n5o6p7.png'
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
