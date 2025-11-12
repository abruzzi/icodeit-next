import {writeFileSync, mkdirSync, existsSync} from 'fs';
import RSS from 'rss';
import {compareDesc} from "date-fns";
import {pathToFileURL} from 'url';
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the generated directory has package.json for ESM
const generatedDir = resolve(__dirname, '../.content-collections/generated');
const packageJsonPath = resolve(generatedDir, 'package.json');

if (!existsSync(packageJsonPath)) {
  mkdirSync(generatedDir, { recursive: true });
  writeFileSync(packageJsonPath, JSON.stringify({ type: "module" }, null, 2) + '\n');
}

// Use file:// URL for reliable ESM import
const allPostsPath = resolve(generatedDir, 'allPosts.js');
const allPostsUrl = pathToFileURL(allPostsPath).href;
const allPostsModule = await import(allPostsUrl);
const allPosts = allPostsModule.default;

const feed = new RSS({
  title: "I Code It | Juntao Qiu",
  description: "I Code It is focusing on maintainable React code and masterful use of frontend technologies like Refactoring and Test-Driven Development.",
  feed_url: 'https://icodeit.com.au/rss.xml',
  site_url: 'https://icodeit.com.au',
})

allPosts.sort((a, b) => compareDesc(a.date, b.date)).map((blog) => ({
  title: blog.title,
  description: blog.description,
  url: `https://icodeit.com.au${blog.slug}`,
  date: blog.date,
})).forEach((item) => {
  feed.item(item)
})

writeFileSync('./public/rss.xml', feed.xml({indent: true}))