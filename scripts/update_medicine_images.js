const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'medicines.json');
const raw = fs.readFileSync(filePath, 'utf-8');
const meds = JSON.parse(raw);

const sanitize = (s) =>
  s
    .replace(/[^a-zA-Z0-9 ,&-]/g, '') // remove odd chars
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();

meds.forEach((med) => {
  const base = sanitize(med.name || med.brand || med.category || 'medicine');
  // Use first few meaningful words for the query
  const words = base.split(' ').slice(0, 4).join(',');
  const category = med.category ? `,${med.category.split(' ').slice(0,2).join(',')}` : '';
  // Unsplash Source URL with size 400x400 and keyword query
  const query = encodeURIComponent(`${words}${category},medicine`);
  med.image = `https://source.unsplash.com/400x400/?${query}`;
});

fs.writeFileSync(filePath, JSON.stringify(meds, null, 2), 'utf-8');
console.log(`Updated ${meds.length} medicines with Unsplash-based image URLs.`);
