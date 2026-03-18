import blogData from 'data/blog/blog.json';
import { siteData } from 'data/portfolio/siteData';
import { getAbsoluteUrl, getBlogPath, getIsoDate } from 'lib/seo';

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const getServerSideProps = async ({ res }) => {
  const siteUrl = siteData.seo.siteUrl.replace(/\/$/, '');

  const items = blogData
    .map(
      (blog) => `<item>
<title>${escapeXml(blog.title)}</title>
<link>${getAbsoluteUrl(siteUrl, getBlogPath(blog))}</link>
<guid>${getAbsoluteUrl(siteUrl, getBlogPath(blog))}</guid>
<description>${escapeXml(blog.shortDescription)}</description>
<pubDate>${new Date(getIsoDate(blog.date)).toUTCString()}</pubDate>
</item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escapeXml(siteData.profile.name)} Blog</title>
<link>${siteUrl}/blog</link>
<description>${escapeXml(siteData.seo.description)}</description>
<language>en-us</language>
${items}
</channel>
</rss>`;

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.write(xml);
  res.end();

  return {
    props: {},
  };
};

const Feed = () => null;

export default Feed;
