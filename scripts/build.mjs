import {mkdir,copyFile,rm} from 'node:fs/promises';
await rm('public',{recursive:true,force:true});
await mkdir('public/src',{recursive:true});
for (const file of ['index.html','style.css','src/app.js','src/model.js']) await copyFile(file,`public/${file}`);
console.log('Built four static application files. No secrets or documentation in web output.');
