import blogData from 'data/blog/blog.json';
import projectData from 'data/portfolio/projects.json';
import { siteData } from 'data/portfolio/siteData';
import { getAbsoluteUrl, getBlogPath, getIsoDate, getProjectPath } from 'lib/seo';

const buildUrlEntry = ({ loc, lastmod, changefreq, priority, image }) => `<url>
<loc>${loc}</loc>
${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
${priority ? `<priority>${priority}</priority>` : ''}
${image ? `<image:image><image:loc>${image}</image:loc></image:image>` : ''}
</url>`;

export const getServerSideProps = async ({ res }) => {
  const siteUrl = siteData.seo.siteUrl.replace(/\/$/, '');

  const urls = [
    {
      loc: `${siteUrl}/`,
      changefreq: 'weekly',
      priority: '1.0',
      image: getAbsoluteUrl(siteUrl, siteData.seo.image),
    },
    {
      loc: `${siteUrl}/blog`,
      changefreq: 'weekly',
      priority: '0.9',
    },
    ...blogData.map((blog) => ({
      loc: getAbsoluteUrl(siteUrl, getBlogPath(blog)),
      lastmod: getIsoDate(blog.date),
      changefreq: 'monthly',
      priority: '0.8',
      image: getAbsoluteUrl(siteUrl, blog.image),
    })),
    ...projectData.projects.map((project) => ({
      loc: getAbsoluteUrl(siteUrl, getProjectPath(project)),
      changefreq: 'monthly',
      priority: '0.8',
      image: getAbsoluteUrl(siteUrl, project.image),
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(buildUrlEntry).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();

  return {
    props: {},
  };
};

const Sitemap = () => null;

export default Sitemap;
