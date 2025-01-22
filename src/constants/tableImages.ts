export const tableImages = {
  easy: [
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/easy/easy-1.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/easy/easy-2.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/easy/easy-3.png'
  ],
  intermediate: [
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/intermediate/intermediate-1.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/intermediate/intermediate-2.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/intermediate/intermediate-3.png'
  ],
  advanced: [
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/advanced/advanced-1.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/advanced/advanced-2.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/advanced/advanced-3.png'
  ],
  expert: [
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/expert/expert-1.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/expert/expert-2.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/expert/expert-3.png'
  ]
};

export const getRandomTable = (difficulty: keyof typeof tableImages, usedTables: string[]) => {
  const availableTables = tableImages[difficulty].filter(table => !usedTables.includes(table));
  
  if (availableTables.length === 0) {
    // Reset if all tables have been used
    return tableImages[difficulty][Math.floor(Math.random() * tableImages[difficulty].length)];
  }
  
  return availableTables[Math.floor(Math.random() * availableTables.length)];
};