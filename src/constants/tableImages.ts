export const tableImages = {
  easy: [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
  ],
  intermediate: [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
  ],
  advanced: [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
  ],
  expert: [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
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