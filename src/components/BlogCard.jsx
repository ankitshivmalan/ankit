import { getBlogPath } from 'lib/seo';

export const BlogCard = ({ blog }) => (
  <article className='blog-card'>
    <a className='blog-card__image' href={getBlogPath(blog)}>
      <img src={blog.image} alt={blog.title} />
      <span className='blog-card__date'>
        <span>{blog.date.month}</span> {blog.date.date}
      </span>
    </a>
    <div className='blog-card__body'>
      <a className='blog-card__title' href={getBlogPath(blog)}>
        {blog.title}
      </a>
      <p>{blog.shortDescription}</p>
      <a className='blog-card__link' href={getBlogPath(blog)}>
        Read more
      </a>
    </div>
  </article>
);
