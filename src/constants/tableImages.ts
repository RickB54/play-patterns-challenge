export const tableImages = {
  easy: [
    'https://www.dropbox.com/scl/fi/2dj5k1aqm8k9wqwpzjq3d/easy1.png?rlkey=c2p5tz2c1qc4h0l1234567890&raw=1',
    'https://www.dropbox.com/scl/fi/3dj5k1aqm8k9wqwpzjq3d/easy2.png?rlkey=d2p5tz2c1qc4h0l1234567890&raw=1',
    'https://www.dropbox.com/scl/fi/4dj5k1aqm8k9wqwpzjq3d/easy3.png?rlkey=e2p5tz2c1qc4h0l1234567890&raw=1'
  ],
  intermediate: [
    'https://www.dropbox.com/scl/fi/5dj5k1aqm8k9wqwpzjq3d/intermediate1.png?rlkey=f2p5tz2c1qc4h0l1234567890&raw=1',
    'https://www.dropbox.com/scl/fi/6dj5k1aqm8k9wqwpzjq3d/intermediate2.png?rlkey=g2p5tz2c1qc4h0l1234567890&raw=1',
    'https://www.dropbox.com/scl/fi/7dj5k1aqm8k9wqwpzjq3d/intermediate3.png?rlkey=h2p5tz2c1qc4h0l1234567890&raw=1'
  ],
  advanced: [
    'https://www.dropbox.com/scl/fi/8dj5k1aqm8k9wqwpzjq3d/advanced1.png?rlkey=i2p5tz2c1qc4h0l1234567890&raw=1',
    'https://www.dropbox.com/scl/fi/9dj5k1aqm8k9wqwpzjq3d/advanced2.png?rlkey=j2p5tz2c1qc4h0l1234567890&raw=1',
    'https://www.dropbox.com/scl/fi/0dj5k1aqm8k9wqwpzjq3d/advanced3.png?rlkey=k2p5tz2c1qc4h0l1234567890&raw=1'
  ],
  expert: [
    'https://www.dropbox.com/scl/fi/1dj5k1aqm8k9wqwpzjq3d/expert1.png?rlkey=l2p5tz2c1qc4h0l1234567890&raw=1',
    'https://www.dropbox.com/scl/fi/2dj5k1aqm8k9wqwpzjq3d/expert2.png?rlkey=m2p5tz2c1qc4h0l1234567890&raw=1',
    'https://www.dropbox.com/scl/fi/3dj5k1aqm8k9wqwpzjq3d/expert3.png?rlkey=n2p5tz2c1qc4h0l1234567890&raw=1'
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