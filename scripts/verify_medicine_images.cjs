const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'medicines.json');
const meds = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const missing = meds.filter((m) => !m.image || m.image.trim() === '');
const urls = meds.map((m) => m.image);
const duplicates = urls.reduce((acc, url) => {
  acc[url] = (acc[url] || 0) + 1;
  return acc;
}, {});
const dupList = Object.entries(duplicates).filter(([url, count]) => count > 1);

console.log(`Total medicines: ${meds.length}`);
console.log(`Missing images: ${missing.length}`);
if (missing.length) missing.forEach((m) => console.log(` - ${m.id}: ${m.name}`));
console.log(`Unique image URLs: ${Object.keys(duplicates).length}`);
if (dupList.length) {
  console.log('Duplicate image URLs found (url -> count):');
  dupList.slice(0, 10).forEach(([url, count]) => console.log(`${url} -> ${count}`));
} else {
  console.log('No duplicate image URLs detected.');
}
