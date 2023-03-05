import { useEffect, useState } from 'react';

const useScrollEvent = (y: number) => {
  const [scrollActive, setScrollActive] = useState(false);
  const onScroll = () => {
    if (window.scrollY > y) {
      setScrollActive(true);

      return;
    }

    setScrollActive(false);
  };

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return { scrollActive };
};

export default useScrollEvent;
