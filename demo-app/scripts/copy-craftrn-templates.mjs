import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const demoRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(demoRoot, '..');

const templateRoot = path.join(repoRoot, 'craftrn-templates');
const destRoot = path.join(demoRoot, 'craftrn-templates');

fs.rmSync(destRoot, { recursive: true, force: true });
fs.cpSync(templateRoot, destRoot, { recursive: true });
