export const tableImages = {
  easy: [
    'https://i.imgur.com/ea32104.png',
    'https://i.imgur.com/eafac1f.png',
    'https://i.imgur.com/ea7396e.png'
  ],
  intermediate: [
    'https://i.imgur.com/in8dd89.png',
    'https://i.imgur.com/in9a1b1.png',
    'https://i.imgur.com/in9bac9.png',
    'https://i.imgur.com/in28c74.png',
    'https://i.imgur.com/in37e6d.png',
    'https://i.imgur.com/in52fd3.png',
    'https://i.imgur.com/in94ba0.png',
    'https://i.imgur.com/in218f2.png',
    'https://i.imgur.com/in606e1.png',
    'https://i.imgur.com/in942e3.png',
    'https://i.imgur.com/in6150b.png',
    'https://i.imgur.com/in7502f.png',
    'https://i.imgur.com/in11177.png',
    'https://i.imgur.com/in25476.png',
    'https://i.imgur.com/in29195.png',
    'https://i.imgur.com/in50907.png',
    'https://i.imgur.com/in55576.png',
    'https://i.imgur.com/in56423.png',
    'https://i.imgur.com/in90703.png',
    'https://i.imgur.com/ina6fe0.png',
    'https://i.imgur.com/inaa1cf.png',
    'https://i.imgur.com/inb403c.png',
    'https://i.imgur.com/inbe71f.png',
    'https://i.imgur.com/inc891a.png',
    'https://i.imgur.com/inc5344.png',
    'https://i.imgur.com/incb2f3.png',
    'https://i.imgur.com/incde71.png',
    'https://i.imgur.com/ine1c35.png',
    'https://i.imgur.com/ine0214.png',
    'https://i.imgur.com/ined79f.png',
    'https://i.imgur.com/inf6598.png',
    'https://i.imgur.com/infd016.png'
  ],
  advanced: [
    'https://i.imgur.com/adb3272.png',
    'https://i.imgur.com/adbb61e.png',
    'https://i.imgur.com/adbe8dd.png',
    'https://i.imgur.com/adc13bb.png',
    'https://i.imgur.com/adc692f.png',
    'https://i.imgur.com/add6804.png',
    'https://i.imgur.com/adda163.png',
    'https://i.imgur.com/addb796.png',
    'https://i.imgur.com/adddc6c.png',
    'https://i.imgur.com/addf372.png',
    'https://i.imgur.com/ade8a5c.png',
    'https://i.imgur.com/ade9e6d.png',
    'https://i.imgur.com/ade121.png',
    'https://i.imgur.com/adeab6e.png',
    'https://i.imgur.com/adeee87.png',
    'https://i.imgur.com/adf0d4a.png',
    'https://i.imgur.com/adf5521.png',
    'https://i.imgur.com/adfb065.png'
  ],
  expert: [
    'https://i.imgur.com/ex59ef0.png',
    'https://i.imgur.com/ex386de.png',
    'https://i.imgur.com/exd9a8b.png'
  ]
};

export const getRandomTable = (difficulty: keyof typeof tableImages, usedTables: string[]) => {
  const availableTables = tableImages[difficulty].filter(table => !usedTables.includes(table));
  
  // If all tables have been used, reset the used tables list and return a random table
  if (availableTables.length === 0) {
    console.log(`All ${difficulty} tables have been used. Resetting selection pool.`);
    // Instead of using a random table from the full set, use the first one
    // This ensures a complete cycle before any table repeats
    return tableImages[difficulty][0];
  }
  
  // Get a random table from the available ones
  const randomIndex = Math.floor(Math.random() * availableTables.length);
  const selectedTable = availableTables[randomIndex];
  
  console.log(`Selected ${difficulty} table: ${selectedTable}`);
  console.log(`Remaining unused tables: ${availableTables.length - 1}`);
  
  return selectedTable;
};