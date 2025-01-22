export const tableImages = {
  easy: [
    'https://dl.dropboxusercontent.com/scl/fi/2dj5k1aqm8k9wqwpzjq3d/easy1.png',
    'https://dl.dropboxusercontent.com/scl/fi/3dj5k1aqm8k9wqwpzjq3d/easy2.png',
    'https://dl.dropboxusercontent.com/scl/fi/4dj5k1aqm8k9wqwpzjq3d/easy3.png'
  ],
  intermediate: [
    'https://dl.dropboxusercontent.com/scl/fi/5dj5k1aqm8k9wqwpzjq3d/intermediate1.png',
    'https://dl.dropboxusercontent.com/scl/fi/6dj5k1aqm8k9wqwpzjq3d/intermediate2.png',
    'https://dl.dropboxusercontent.com/scl/fi/7dj5k1aqm8k9wqwpzjq3d/intermediate3.png'
  ],
  advanced: [
    'https://dl.dropboxusercontent.com/scl/fi/8dj5k1aqm8k9wqwpzjq3d/advanced1.png',
    'https://dl.dropboxusercontent.com/scl/fi/9dj5k1aqm8k9wqwpzjq3d/advanced2.png',
    'https://dl.dropboxusercontent.com/scl/fi/0dj5k1aqm8k9wqwpzjq3d/advanced3.png'
  ],
  expert: [
    'https://dl.dropboxusercontent.com/scl/fi/1dj5k1aqm8k9wqwpzjq3d/expert1.png',
    'https://dl.dropboxusercontent.com/scl/fi/2dj5k1aqm8k9wqwpzjq3d/expert2.png',
    'https://dl.dropboxusercontent.com/scl/fi/3dj5k1aqm8k9wqwpzjq3d/expert3.png'
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