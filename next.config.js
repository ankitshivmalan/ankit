const blogData = require('./src/data/blog/blog.json');

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

module.exports = {
  async redirects() {
    return blogData.map((blog) => ({
      source: `/blog/${blog.id}`,
      destination: `/blog/${slugify(blog.title)}`,
      permanent: true,
    }));
  },
};
