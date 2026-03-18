import { useEffect } from 'react';
import blogData from 'data/blog/blog.json';
import { Layout } from 'components/Layout';
import { siteData } from 'data/portfolio/siteData';
import { getAbsoluteUrl, getBlogPath, getBlogSlug, getIsoDate } from 'lib/seo';

export default function BlogPostPage({ blog }) {
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

  const publishedTime = getIsoDate(blog.date);
  const articleUrl = getAbsoluteUrl(siteData.seo.siteUrl, getBlogPath(blog));
  const imageUrl = getAbsoluteUrl(siteData.seo.siteUrl, blog.image);

  return (
    <Layout
      title={`${blog.title} | Ankit Singh Blog`}
      description={blog.shortDescription}
      image={blog.image}
      type='article'
      publishedTime={publishedTime}
      modifiedTime={publishedTime}
      keywords={[
        blog.title,
        blog.subTitle,
        ...blog.tags.map((tag) => tag.title),
        'software engineering blog',
      ]}
      schema={[
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.shortDescription,
          image: [imageUrl],
          mainEntityOfPage: articleUrl,
          url: articleUrl,
          datePublished: publishedTime,
          dateModified: publishedTime,
          author: {
            '@type': 'Person',
            name: blog.authorName,
          },
          publisher: {
            '@type': 'Person',
            name: siteData.profile.name,
          },
          keywords: blog.tags.map((tag) => tag.title).join(', '),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: getAbsoluteUrl(siteData.seo.siteUrl, '/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: getAbsoluteUrl(siteData.seo.siteUrl, '/blog'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: blog.title,
              item: articleUrl,
            },
          ],
        },
      ]}
    >
      <section className='post-page ftco-section page-section'>
        <div className='container post-shell'>
          <a className='button button--secondary button--inline' href='/blog'>
            Back to blog
          </a>

          <article className='post-card'>
            <div className='section-heading'>
              <h1>{blog.title}</h1>
              <p>{blog.subTitle}</p>
            </div>

            <img className='post-card__image' src={blog.image} alt={blog.title} />

            <div className='post-meta'>
              <span>
                {blog.date.month} {blog.date.date}, {blog.date.year}
              </span>
              <span>{blog.authorName}</span>
              <span>{blog.totalCommentCount} comments</span>
            </div>

            <div className='post-content'>
              <p>{blog.content}</p>
              <h2>{blog.titleTwo}</h2>
              <p>{blog.contentTwo}</p>

              <blockquote>
                <p>{blog.quote.content}</p>
                <cite>{blog.quote.author}</cite>
              </blockquote>

              <div className='post-list'>
                {blog.postList.map((item) => (
                  <div key={item.title} className='post-list__item'>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                ))}
              </div>

              <div className='promo-card' style={{ backgroundImage: `url(${blog.discount.thumb})` }}>
                <div className='promo-card__overlay'>
                  <span>{blog.discount.silentText}</span>
                  <h3>{blog.discount.title}</h3>
                  <p>{blog.discount.subTitle}</p>
                  <ul>
                    {blog.discount.attributes.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.content}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p>{blog.contentThree}</p>

              <div className='skills__chips'>
                {blog.tags.map((tag) => (
                  <span key={tag.categoryId} className='skill-chip'>
                    {tag.title}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: blogData.map((blog) => ({ params: { slug: getBlogSlug(blog) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      blog: blogData.find((item) => getBlogSlug(item) === params.slug),
    },
  };
}
