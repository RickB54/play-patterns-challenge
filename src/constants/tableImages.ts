// Define static URLs for table images
export const tableImages = {
  easy: [
    'https://images.unsplash.com/photo-1461010083959-8a5727311252',
    'https://images.unsplash.com/photo-1473976345543-9ffc928e648d',
    'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990'
  ],
  intermediate: [
    'https://images.unsplash.com/photo-1505662695181-d4b60363d2a3',
    'https://images.unsplash.com/photo-1518169888978-77a43af0f792',
    'https://images.unsplash.com/photo-1505662695181-d4b60363d2a3',
    'https://images.unsplash.com/photo-1518169888978-77a43af0f792',
    'https://images.unsplash.com/photo-1505662695181-d4b60363d2a3'
  ],
  advanced: [
    'https://images.unsplash.com/photo-1518169888978-77a43af0f792',
    'https://images.unsplash.com/photo-1505662695181-d4b60363d2a3',
    'https://images.unsplash.com/photo-1518169888978-77a43af0f792'
  ],
  expert: [
    'https://images.unsplash.com/photo-1505662695181-d4b60363d2a3',
    'https://images.unsplash.com/photo-1518169888978-77a43af0f792',
    'https://images.unsplash.com/photo-1505662695181-d4b60363d2a3'
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