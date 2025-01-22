export const tableImages = {
  easy: [
    'https://www.dropbox.com/scl/fi/qnjk3trxja1439e7bbjo9/ea-32104.png?raw=1',
    'https://www.dropbox.com/scl/fi/2lmudn0z5men0we347qij/ea-fac1f.png?raw=1',
    'https://www.dropbox.com/scl/fi/nuoclvr1yfekdt3jh518p/ea-7396e.png?raw=1'
  ],
  intermediate: [
    'https://www.dropbox.com/scl/fi/gn37rv3krdva8o5cq8k87/in-8dd89.png?raw=1',
    'https://www.dropbox.com/scl/fi/2g1g1g1g1g1g1g1g1g1g1/in-8dd90.png?raw=1',
    'https://www.dropbox.com/scl/fi/2g1g1g1g1g1g1g1g1g1g1/in-8dd91.png?raw=1'
  ],
  advanced: [
    'https://www.dropbox.com/scl/fi/ggn60l8efyke79pc2tiim/ad-b3272.png?raw=1',
    'https://www.dropbox.com/scl/fi/2g1g1g1g1g1g1g1g1g1g1/ad-b3273.png?raw=1',
    'https://www.dropbox.com/scl/fi/2g1g1g1g1g1g1g1g1g1/ad-b3274.png?raw=1'
  ],
  expert: [
    'https://www.dropbox.com/scl/fi/l7qfuesms6eozz800se8v/ex-59ef0.png?raw=1',
    'https://www.dropbox.com/scl/fi/2o9z9dqpa37ygwjubbb0x/ex-386de.png?raw=1',
    'https://www.dropbox.com/scl/fi/bndf6ns14cg8mjtxf6s1e/ex-d9a8b.png?raw=1'
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
