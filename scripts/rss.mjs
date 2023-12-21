import {writeFileSync} from 'fs';
import RSS from 'rss';

import {allPosts} from "../.contentlayer/generated/index.mjs";
import {compareDesc} from "date-fns";

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