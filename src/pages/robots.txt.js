import { siteData } from 'data/portfolio/siteData';

export const getServerSideProps = async ({ res }) => {
  const siteUrl = siteData.seo.siteUrl.replace(/\/$/, '');

  const content = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();

  return {
    props: {},
  };
};

const Robots = () => null;

export default Robots;
