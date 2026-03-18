import { useEffect } from 'react';
import { useRouter } from 'next/router';
import 'styles/globals.css';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleRouteChange = (url) => {
      if (!url.includes('#')) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (router.asPath.includes('#')) return;

    const scrollToTop = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    const timer = window.setTimeout(scrollToTop, 120);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [router.asPath]);

  return <Component {...pageProps} />;
};

export default App;
