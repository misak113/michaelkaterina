
const fs = require('fs');
const { execSync } = require('child_process');

const imagesPath = __dirname + '/../photos';

const filenames = fs.readdirSync(imagesPath);
const files = [];

for (const filename of filenames) {
    const filePath = imagesPath + '/' + filename;
    const command = `identify -verbose ${filePath}  | grep "exif:DateTimeDigitized:" | awk -F ": " '{print $2}'`;
    const res = execSync(command);
    const takenAt = new Date(res.toString().replace(':', '-').replace(':', '-'));
    files.push({ filename, takenAt });
    console.log(filename, takenAt);
}

const sortedFiles = files.sort((a, b) => a.takenAt.valueOf() - b.takenAt.valueOf());

fs.writeFileSync(__dirname + '/../src/Pages/imagesFileNames.json', JSON.stringify(sortedFiles.map((file) => file.filename)));
