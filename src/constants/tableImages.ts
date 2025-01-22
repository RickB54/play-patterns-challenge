export const TABLE_IMAGES = {
  easy: [
    'https://www.dropbox.com/scl/fi/qnjk3trxja1439e7bbjo9/ea-32104.png?raw=1',
    'https://www.dropbox.com/scl/fi/2lmudn0z5men0we347qij/ea-fac1f.png?raw=1',
    'https://www.dropbox.com/scl/fi/nuoclvr1yfekdt3jh518p/ea-7396e.png?raw=1'
  ],
  intermediate: [
    'https://www.dropbox.com/scl/fi/gn37rv3krdva8o5cq8k87/in-8dd89.png?raw=1',
    'https://www.dropbox.com/scl/fi/i2djpe0g87tg5m41llwde/in-9a1b1.png?raw=1',
    // ... add all intermediate URLs
  ],
  advanced: [
    'https://www.dropbox.com/scl/fi/ggn60l8efyke79pc2tiim/ad-b3272.png?raw=1',
    'https://www.dropbox.com/scl/fi/pw2nb8op4wq4j11ipk424/ad-bb61e.png?raw=1',
    // ... add all advanced URLs
  ],
  expert: [
    'https://www.dropbox.com/scl/fi/l7qfuesms6eozz800se8v/ex-59ef0.png?raw=1',
    'https://www.dropbox.com/scl/fi/2o9z9dqpa37ygwjubbb0x/ex-386de.png?raw=1',
    'https://www.dropbox.com/scl/fi/bndf6ns14cg8mjtxf6s1e/ex-d9a8b.png?raw=1'
  ]
};

export const getRandomTable = (difficulty: string, usedTables: string[]): string => {
  const tables = TABLE_IMAGES[difficulty.toLowerCase() as keyof typeof TABLE_IMAGES];
  const availableTables = tables.filter(table => !usedTables.includes(table));
  
  if (availableTables.length === 0) {
    // All tables have been used, reset and start over
    return tables[Math.floor(Math.random() * tables.length)];
  }
  
  return availableTables[Math.floor(Math.random() * availableTables.length)];
};