import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { siteData } from 'data/portfolio/siteData';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#resume', label: 'Resume' },
  { href: '/#services', label: 'Services' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

export const Layout = ({
  children,
  title,
  description,
  image,
  schema,
  noindex = false,
  keywords,
  type = 'website',
  publishedTime,
  modifiedTime,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const closeMenu = () => setMenuOpen(false);
  const siteUrl = siteData.seo.siteUrl.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}${router.asPath === '/' ? '' : router.asPath}`.split('#')[0].split('?')[0];
  const metaTitle = title || siteData.seo.title;
  const metaDescription = description || siteData.seo.description;
  const metaImage = image || siteData.seo.image;
  const imageUrl = metaImage.startsWith('http') ? metaImage : `${siteUrl}${metaImage}`;
  const metaKeywords = (keywords || siteData.seo.keywords).filter(Boolean);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name='description' content={metaDescription} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content={metaKeywords.join(', ')} />
        <meta name='author' content={siteData.profile.name} />
        {siteData.seo.googleSiteVerification ? (
          <meta
            name='google-site-verification'
            content={siteData.seo.googleSiteVerification}
          />
        ) : null}
        <meta name='robots' content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
        <link rel='canonical' href={canonicalUrl} />
        <link rel='icon' href={siteData.seo.image} />
        <link rel='apple-touch-icon' href={siteData.seo.image} />

        <meta property='og:type' content={type} />
        <meta property='og:title' content={metaTitle} />
        <meta property='og:description' content={metaDescription} />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:site_name' content={siteData.profile.name} />
        {publishedTime ? <meta property='article:published_time' content={publishedTime} /> : null}
        {modifiedTime ? <meta property='article:modified_time' content={modifiedTime} /> : null}

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={metaTitle} />
        <meta name='twitter:description' content={metaDescription} />
        <meta name='twitter:image' content={imageUrl} />
        <meta name='theme-color' content='#000000' />

        <link rel='manifest' href='/site.webmanifest' />
        <link rel='alternate' type='application/rss+xml' title={`${siteData.profile.name} Blog Feed`} href='/feed.xml' />
        {schema ? (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ) : null}
      </Head>

      <div className='site-shell'>
        <header className='site-header'>
          <div className='container site-header__inner'>
            <Link href='/'>
              <a className='brand' onClick={closeMenu}>
                {siteData.profile.name}
              </a>
            </Link>

            <button
              type='button'
              className='menu-toggle'
              aria-expanded={menuOpen}
              aria-controls='site-nav'
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className='menu-toggle__icon'>☰</span>
              <span>Menu</span>
            </button>

            <nav
              id='site-nav'
              className={`site-nav${menuOpen ? ' is-open' : ''}`}
              aria-label='Primary'
            >
              {navLinks.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
              <a
                className='header-cta'
                href={siteData.profile.resumeFile}
                target='_blank'
                rel='noreferrer'
                onClick={closeMenu}
              >
                Download CV
              </a>
            </nav>
          </div>
        </header>
        {children}
        <footer className='site-footer'>
          <div className='container site-footer__inner'>
            <p>{siteData.profile.name}</p>
            <p>{siteData.profile.role}</p>
          </div>
        </footer>
      </div>
    </>
  );
};
