import fs from 'fs/promises';
import path from 'path';

async function generateSidebarConfig(rootDir = 'docs') {
  const sidebarConfig = {};

  async function processDirectory(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const items = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(rootDir, fullPath);

      if (entry.isDirectory()) {
        const subItems = await processDirectory(fullPath);
        if (subItems.length > 0) {
          items.push({
            text: entry.name,
            collapsed: true,
            items: subItems
          });
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const text = path.parse(entry.name).name;
        const link = `/${relativePath.replace(/\.md$/, '')}`;
        items.push({ text, link });
      }
    }

    return items;
  }

  const topLevelDirs = await fs.readdir(rootDir, { withFileTypes: true });

  for (const entry of topLevelDirs) {
    if (entry.isDirectory()) {
      const dirPath = path.join(rootDir, entry.name);
      const items = await processDirectory(dirPath);
      if (items.length > 0) {
        sidebarConfig[`/${entry.name}/`] = [
          {
            text: entry.name,
            items: items
          }
        ];
      }
    }
  }

  return sidebarConfig;
}

export { generateSidebarConfig };
