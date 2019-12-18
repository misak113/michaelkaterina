
const fs = require('fs');

const filenames = fs.readdirSync(__dirname + '/../photos');

fs.writeFileSync(__dirname + '/../src/Pages/imagesFileNames.json', JSON.stringify(filenames));
