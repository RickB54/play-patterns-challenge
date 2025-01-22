export const tableImages = {
  easy: [
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/easy/easy1.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/easy/easy2.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/easy/easy3.png'
  ],
  intermediate: [
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/intermediate/intermediate1.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/intermediate/intermediate2.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/intermediate/intermediate3.png'
  ],
  advanced: [
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/advanced/advanced1.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/advanced/advanced2.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/advanced/advanced3.png'
  ],
  expert: [
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/expert/expert1.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/expert/expert2.png',
    'https://raw.githubusercontent.com/lovable-games/pool-table-patterns/main/expert/expert3.png'
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