const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\clift\\Desktop\\WEB DEVELOPMENT\\Leadpac-Foundation';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git')) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(dir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Text replacements
    content = content.replace(/Goals Afrika/g, 'Leadpac Foundation');
    content = content.replace(/GOALS AFRIKA/g, 'LEADPAC FOUNDATION');
    content = content.replace(/goalsafrika/g, 'leadpacfoundation');
    
    // Header logo replacement
    // The user wants to replace the header logo across all pages
    const newLogo = 'https://i.postimg.cc/TYsKZ6Kq/308408317-466190838885107-7274109674455319942-n.jpg';
    
    // In index.html it looks like:
    // <div class="logo">
    //   <a href=""><img src="..." alt="" /></a>
    // </div>
    // Using a regex to find <div class="logo"> ... <img src="..." ... </div>
    const regex = /(<div\s+class="logo">[\s\S]*?<img[\s\S]*?src=")([^"]+)("[\s\S]*?>)/g;
    content = content.replace(regex, `$1${newLogo}$3`);
    
    fs.writeFileSync(file, content, 'utf8');
});

console.log('Processed ' + files.length + ' files.');
