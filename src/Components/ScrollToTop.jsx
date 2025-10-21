import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if we're navigating back/forward (browser history)
    const scrollPositions = JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
    const savedPosition = scrollPositions[location.key];

    if (savedPosition && location.state?.fromHistory) {
      // Restore scroll position for back/forward navigation
      window.scrollTo({
        top: savedPosition,
        left: 0,
        behavior: 'instant'
      });
    } else {
      // Scroll to top for regular navigation
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }

    // Save scroll position when navigating away
    const handleScroll = () => {
      const positions = JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
      positions[location.key] = window.scrollY;
      sessionStorage.setItem('scrollPositions', JSON.stringify(positions));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  return null;
};

export default ScrollToTop;
