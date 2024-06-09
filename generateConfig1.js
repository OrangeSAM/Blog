const fs = require('fs').promises;
const path = require('path');

async function generateDirectory(dir) {
  const files = await fs.readdir(dir);
  const finalConfig = {};

  async function handleDirectory(file) {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      if (file !== '.vuepress') { // Skip processing the .vuepress directory
        const subFiles = await fs.readdir(filePath);

        if (subFiles.includes('readme.md')) {
          const readmePath = path.join(filePath, 'readme.md');
          const readmeStats = await fs.stat(readmePath);

          if (readmeStats.isFile()) {
            const readmeContent = await fs.readFile(readmePath, 'utf-8');
            const titleMatch = readmeContent.match(/# (.+)/);
            const title = titleMatch ? titleMatch[1] : '';

            finalConfig[`/${file}/`] = [{
              title: title,
              collapsable: true,
              sidebarDepth: 4,
              children: ['']
            }];
          }
        } else {
          finalConfig[`/${file}/`] = [];
          await Promise.all(subFiles.map(subFile => handleDirectory(path.join(file, subFile))));
        }
      }
    } else {
      if (file !== 'readme.md') {
        const parentDir = path.basename(dir);
        const targetStr = path.join(parentDir, file);

        if (finalConfig[`/${parentDir}/`]) {
          const obj = finalConfig[`/${parentDir}/`].find(e => e.title === parentDir);

          if (obj) {
            obj.children.push(targetStr);
          } else {
            finalConfig[`/${parentDir}/`].push({
              title: parentDir,
              collapsable: true,
              sidebarDepth: 4,
              children: [targetStr]
            });
          }
        }
      }
    }
  }

  await Promise.all(files.map(file => handleDirectory(file)));

  return finalConfig;
}

(async () => {
  const config = await generateDirectory('./docs');
  fs.writeFile('directoryConfig.js', 'module.exports = ' + JSON.stringify(config));
})();