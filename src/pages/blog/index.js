import { useEffect, useRef } from 'react';
import blogData from 'data/blog/blog.json';
import { BlogCard } from 'components/BlogCard';
import { Layout } from 'components/Layout';
import { Pagination } from 'components/Pagination';
import { usePagination } from 'components/usePagination';
import { getAbsoluteUrl, getBlogPath, getIsoDate } from 'lib/seo';
import { siteData } from 'data/portfolio/siteData';

export default function BlogPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    const timer = window.setTimeout(scrollToTop, 80);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  const pagination = usePagination(blogData, 3, {
    onPageChange: () => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  });

  return (
    <Layout
      title='Software Engineering Blog | Ankit Singh'
      description='Technical articles on Node.js, APIs, MongoDB, Docker, Git workflows, and scalable software architecture.'
      keywords={[
        'software engineering blog',
        'node.js articles',
        'mongodb articles',
        'docker articles',
        'system design blog',
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Ankit Singh Blog',
        description: 'Technical writing on backend engineering, APIs, databases, DevOps, and system design.',
        url: getAbsoluteUrl(siteData.seo.siteUrl, '/blog'),
        blogPost: blogData.map((blog) => ({
          '@type': 'BlogPosting',
          headline: blog.title,
          url: getAbsoluteUrl(siteData.seo.siteUrl, getBlogPath(blog)),
          datePublished: getIsoDate(blog.date),
          author: {
            '@type': 'Person',
            name: blog.authorName,
          },
        })),
      }}
    >
      <section ref={sectionRef} className='blog-page ftco-section page-section'>
        <div className='container'>
          <div className='section-heading section-heading--center'>
            <h1 className='big big-2'>Blog</h1>
            <h2>All Articles</h2>
            <p>List and pagination logic is adapted from the reference frontend blog implementation.</p>
          </div>

          <div className='blog-grid'>
            {pagination.currentData().map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          <Pagination pagination={pagination} />
        </div>
      </section>
    </Layout>
  );
}
