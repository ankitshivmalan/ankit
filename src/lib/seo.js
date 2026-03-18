const MONTHS = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
};

export const getSiteUrl = (siteUrl) => siteUrl.replace(/\/$/, '');

export const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const getBlogSlug = (blog) => slugify(blog.title);

export const getBlogPath = (blog) => `/blog/${getBlogSlug(blog)}`;

export const getProjectPath = (project) => `/projects/${project.slug}`;

export const getAbsoluteUrl = (siteUrl, path = '') => `${getSiteUrl(siteUrl)}${path}`;

export const getIsoDate = (date) => {
  const month = MONTHS[String(date.month).toLowerCase()];
  const day = String(date.date).padStart(2, '0');

  return `${date.year}-${month}-${day}`;
};
