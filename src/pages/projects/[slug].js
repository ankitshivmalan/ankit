import { useEffect } from 'react';
import Link from 'next/link';
import { Layout } from 'components/Layout';
import projectData from 'data/portfolio/projects.json';
import { siteData } from 'data/portfolio/siteData';
import { getAbsoluteUrl } from 'lib/seo';

export default function ProjectCaseStudyPage({ project }) {
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

  return (
    <Layout
      title={`${project.title} | Case Study`}
      description={project.description}
      image={project.image}
      keywords={[
        project.title,
        project.category,
        ...project.technologies,
        'software development case study',
      ]}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        image: [getAbsoluteUrl(siteData.seo.siteUrl, project.image)],
        url: getAbsoluteUrl(siteData.seo.siteUrl, `/projects/${project.slug}`),
        keywords: project.technologies.join(', '),
      }}
    >
      <section className='project-page ftco-section page-section'>
        <div className='container project-shell'>
          <Link href='/#projects'>
            <a className='button button--secondary button--inline'>Back to Projects</a>
          </Link>

          <article className='project-case-card'>
            <div className='project-case-hero'>
              <img src={project.image} alt={project.title} />
            </div>

            <div className='project-case-header'>
              <span className='project-card__category'>{project.category}</span>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <div className='project-card__tags'>
                {project.technologies.map((tech) => (
                  <span key={tech} className='project-card__tag'>
                    {tech}
                  </span>
                ))}
              </div>
              {project.websiteUrl ? (
                <div className='project-case-actions'>
                  <a
                    className='button button--primary'
                    href={project.websiteUrl}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Visit Now
                  </a>
                </div>
              ) : null}
            </div>

            <div className='project-case-grid'>
              <section className='project-case-section'>
                <h2>Problem Statement</h2>
                <p>{project.caseStudy.problem}</p>
              </section>
              <section className='project-case-section'>
                <h2>Solution Implemented</h2>
                <p>{project.caseStudy.solution}</p>
              </section>
            </div>

            <section className='project-case-section'>
              <h2>Key Features</h2>
              <ul className='project-case-list'>
                {project.caseStudy.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>

            <section className='project-case-section'>
              <h2>Result / Outcome</h2>
              <p>{project.caseStudy.result}</p>
            </section>

            <section className='project-case-section'>
              <h2>Image Gallery</h2>
              <div className='project-gallery'>
                {project.gallery.map((image, index) => (
                  <div key={`${project.slug}-${index}`} className='project-gallery__item'>
                    <img src={image} alt={`${project.title} gallery ${index + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: projectData.projects.map((project) => ({ params: { slug: project.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      project: projectData.projects.find((item) => item.slug === params.slug),
    },
  };
}
