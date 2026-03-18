import Link from 'next/link';
import blogData from 'data/blog/blog.json';
import { BlogCard } from 'components/BlogCard';
import { EnquiryForm } from 'components/EnquiryForm';
import { Layout } from 'components/Layout';
import projectData from 'data/portfolio/projects.json';
import { getAbsoluteUrl, getBlogPath, getProjectPath } from 'lib/seo';
import { siteData } from 'data/portfolio/siteData';

const featuredBlogs = blogData.slice(0, 3);
const featuredProjects = projectData.projects.slice(0, 6);

const skillSectionIcons = {
  frontend: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M4 6H20' />
      <path d='M4 12H14' />
      <path d='M4 18H11' />
    </svg>
  ),
  mobile: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <rect x='7' y='2.5' width='10' height='19' rx='2.2' />
      <path d='M10 5.5H14' />
      <path d='M11.5 18.5H12.5' />
    </svg>
  ),
  backend: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <rect x='3' y='4' width='18' height='6' rx='2' />
      <rect x='3' y='14' width='18' height='6' rx='2' />
      <path d='M7 7H7.01' />
      <path d='M7 17H7.01' />
    </svg>
  ),
  database: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <ellipse cx='12' cy='6' rx='7' ry='3' />
      <path d='M5 6V12C5 13.7 8.1 15 12 15C15.9 15 19 13.7 19 12V6' />
      <path d='M5 12V18C5 19.7 8.1 21 12 21C15.9 21 19 19.7 19 18V12' />
    </svg>
  ),
  devops: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M7 18H17C19.2 18 21 16.3 21 14.2C21 12.3 19.6 10.7 17.7 10.4C17.1 7.8 14.8 6 12 6C9.5 6 7.3 7.5 6.4 9.7C4.4 10 3 11.7 3 13.6C3 16 4.8 18 7 18Z' />
    </svg>
  ),
  tools: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M14.7 6.3A4 4 0 0 0 9 11l-5 5a1.4 1.4 0 0 0 2 2l5-5a4 4 0 0 0 4.7-6.7L13 9l2-2l2.7-.7Z' />
    </svg>
  ),
};

const skillItemIcons = {
  HTML: '🌐',
  CSS: '🎨',
  JavaScript: '🟨',
  TypeScript: '🔷',
  React: '⚛',
  'React Native': '📱',
  'Android Studio': '🤖',
  Expo: '🚀',
  'Mobile APIs': '🔌',
  'Node.js': '🟩',
  Express: '⚙',
  'REST APIs': '🔗',
  'JWT Auth': '🔐',
  MongoDB: '🍃',
  SQL: '🗃',
  'CI/CD': '♾',
  Docker: '🐳',
  Nginx: '🌍',
  'Linux Server': '🐧',
  Git: '🌿',
  'VS Code': '🧑‍💻',
  Postman: '📮',
  Figma: '🎯',
};

const serviceIcons = {
  code: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M8 8L4 12L8 16' />
      <path d='M16 8L20 12L16 16' />
      <path d='M14 4L10 20' />
    </svg>
  ),
  mobile: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <rect x='7' y='2.5' width='10' height='19' rx='2.2' />
      <path d='M10 5.5H14' />
      <path d='M11.5 18.5H12.5' />
    </svg>
  ),
  database: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <ellipse cx='12' cy='6' rx='7' ry='3' />
      <path d='M5 6V12C5 13.7 8.1 15 12 15C15.9 15 19 13.7 19 12V6' />
      <path d='M5 12V18C5 19.7 8.1 21 12 21C15.9 21 19 19.7 19 18V12' />
    </svg>
  ),
  cloud: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M7 18H17C19.2 18 21 16.3 21 14.2C21 12.3 19.6 10.7 17.7 10.4C17.1 7.8 14.8 6 12 6C9.5 6 7.3 7.5 6.4 9.7C4.4 10 3 11.7 3 13.6C3 16 4.8 18 7 18Z' />
    </svg>
  ),
};

export default function HomePage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteData.profile.name,
    url: siteData.seo.siteUrl,
    image: getAbsoluteUrl(siteData.seo.siteUrl, siteData.seo.image),
    description: siteData.seo.description,
    email: siteData.profile.email,
    telephone: siteData.profile.phone,
    areaServed: 'India',
    sameAs: [],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      ...featuredProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: getAbsoluteUrl(siteData.seo.siteUrl, getProjectPath(project)),
        name: project.title,
      })),
      ...featuredBlogs.map((blog, index) => ({
        '@type': 'ListItem',
        position: featuredProjects.length + index + 1,
        url: getAbsoluteUrl(siteData.seo.siteUrl, getBlogPath(blog)),
        name: blog.title,
      })),
    ],
  };

  return (
    <Layout
      schema={[websiteSchema, itemListSchema]}
      keywords={[
        ...siteData.seo.keywords,
        'software developer portfolio',
        'web development services',
        'case studies',
        'engineering blog',
      ]}
    >
      <section className='hero ftco-section' id='home'>
        <div className='container hero__grid'>
          <div className='hero__copy'>
            <span className='section-kicker'>Hello World!</span>
            <h1>
              I&apos;m <span>{siteData.profile.name}</span>
            </h1>
            <h2>{siteData.profile.subheading}</h2>
            <p>{siteData.profile.intro}</p>
            <div className='hero__actions'>
              <a className='button button--primary' href='#contact'>
                Hire me
              </a>
              <a className='button button--secondary' href='#projects'>
                My works
              </a>
            </div>
          </div>
          <div className='hero__media'>
            <div className='hero__glow'></div>
            <img src={siteData.profile.heroImage} alt={siteData.profile.name} />
          </div>
        </div>
      </section>

      <section className='about ftco-section' id='about'>
        <div className='container about__grid'>
          <div className='about__photo'>
            <img src={siteData.profile.aboutImage} alt={`${siteData.profile.name} casual portrait`} />
          </div>
          <div className='about__content'>
            <div className='section-heading'>
              <h1 className='big'>About</h1>
              <h2>About Me</h2>
              <p>{siteData.profile.summary}</p>
            </div>
            <ul className='about-info'>
              <li>
                <span>Name:</span> <strong>{siteData.profile.name}</strong>
              </li>
              <li>
                <span>Location:</span> <strong>{siteData.profile.location}</strong>
              </li>
              <li>
                <span>Email:</span> <strong>{siteData.profile.email}</strong>
              </li>
              <li>
                <span>Phone:</span> <strong>{siteData.profile.phone}</strong>
              </li>
            </ul>
            <div className='counter-wrap'>
              {siteData.stats.map((item) => (
                <div key={item.label} className='stat-box'>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <a
              className='button button--primary'
              href={siteData.profile.resumeFile}
              target='_blank'
              rel='noreferrer'
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      <section className='resume ftco-section' id='resume'>
        <div className='container'>
          <div className='section-heading section-heading--center'>
            <h1 className='big big-2'>Resume</h1>
            <h2>Resume</h2>
            <p>Experience building scalable products, business platforms, and enterprise systems.</p>
          </div>

          <div className='resume__grid'>
            {siteData.experience.map((item) => (
              <article key={`${item.company}-${item.period}`} className='resume-card'>
                <span className='date'>{item.period}</span>
                <h3>{item.title}</h3>
                <span className='position'>
                  {item.company}, {item.location}
                </span>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className='resume__grid resume__grid--small'>
            {siteData.education.map((item) => (
              <article key={item.title} className='resume-card'>
                <span className='date'>{item.period}</span>
                <h3>{item.title}</h3>
                <span className='position'>{item.institution}</span>
              </article>
            ))}
            <article className='resume-card'>
              <span className='date'>Certifications</span>
              <h3>Industry Credentials</h3>
              <span className='position'>Networking and Security</span>
              <ul>
                {siteData.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className='services ftco-section' id='services'>
        <div className='container'>
          <div className='section-heading section-heading--center'>
            <h1 className='big big-2'>Services</h1>
            <h2>Services</h2>
            <p>Helping startups and businesses build scalable digital products and automation systems.</p>
          </div>
          <div className='services__grid'>
            {siteData.services.map((item) => (
              <article key={item.title} className='service-card'>
                <span className='service-card__icon'>{serviceIcons[item.icon]}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='skills ftco-section' id='skills'>
        <div className='container'>
          <div className='section-heading section-heading--center'>
            <h1 className='big big-2'>Skills</h1>
            <h2>Technologies & Tools</h2>
            <p>Technologies and tools I use to design, build, and deploy modern applications.</p>
          </div>
          <div className='skills__grid'>
            {siteData.skills.map((group) => (
              <article key={group.title} className='skill-card'>
                <h3>
                  <span className='skill-card__title-icon'>{skillSectionIcons[group.icon]}</span>
                  {group.title}
                </h3>
                <div className='skill-card__items'>
                  {group.items.map((item) => (
                    <span key={item} className='skill-item'>
                      <span className='skill-item__icon'>{skillItemIcons[item] || '•'}</span>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='projects ftco-section' id='projects'>
        <div className='container'>
          <div className='section-heading section-heading--center'>
            <h1 className='big big-2'>Projects</h1>
            <h2>Case Studies</h2>
            <p>Selected product, platform, and website work presented as outcome-focused case studies.</p>
          </div>
          <div className='projects__grid'>
            {featuredProjects.map((project) => (
              <article key={project.slug} className='project-card project-card--case'>
                <a className='project-card__image' href={`/projects/${project.slug}`}>
                  <img src={project.image} alt={project.title} />
                </a>
                <div className='project-card__body'>
                  <span className='project-card__category'>{project.category}</span>
                  <h3>
                    <a className='project-card__title-link' href={`/projects/${project.slug}`}>
                      {project.title}
                    </a>
                  </h3>
                  <p>{project.description}</p>
                  <div className='project-card__tags'>
                    {project.technologies.map((tech) => (
                      <span key={tech} className='project-card__tag'>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className='project-card__actions'>
                    <a className='button button--secondary project-card__button' href={`/projects/${project.slug}`}>
                      View Case Study
                    </a>
                    {project.websiteUrl ? (
                      <a
                        className='button button--primary project-card__button'
                        href={project.websiteUrl}
                        target='_blank'
                        rel='noreferrer'
                      >
                        Visit Now
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='blog ftco-section' id='blog'>
        <div className='container'>
          <div className='section-heading section-heading--center'>
            <h1 className='big big-2'>Blog</h1>
            <h2>Blog</h2>
            <p>The blog cards and detail flow use the same JSON-driven approach from the `frontend` reference.</p>
          </div>
          <div className='blog-grid'>
            {featuredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          <div className='section-cta'>
            <a className='button button--secondary button--linklike' href='/blog'>
              View all blogs
            </a>
          </div>
        </div>
      </section>

      <section className='contact ftco-section' id='contact'>
        <div className='container contact__grid'>
          <div className='section-heading section-heading--center contact__heading'>
            <h1 className='big big-2'>Contact</h1>
            <h2>Contact</h2>
            <p>Let&apos;s discuss your next product, brand, or growth requirement.</p>
          </div>
          <div className='contact__intro'>
            <div className='section-heading'>
              <h1 className='big'>Contact</h1>
              <h2>Have a project in mind?</h2>
              <p>
                Share your requirements with us and our team will connect with you shortly to discuss the right approach for your project.
              </p>
            </div>
            <div className='contact__details'>
              <a href={`mailto:${siteData.profile.email}`}>{siteData.profile.email}</a>
              <a href={`tel:${siteData.profile.phone}`}>{siteData.profile.phone}</a>
              <p>{siteData.profile.address}</p>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </Layout>
  );
}
