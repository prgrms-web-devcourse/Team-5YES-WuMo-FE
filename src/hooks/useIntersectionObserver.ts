import { useEffect, useState } from 'react';

const option = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

const useIntersectionObserver = (fetchNextPage: () => void) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && fetchNextPage(),
      option
    );

    observer.observe(target);
    return () => observer && observer.unobserve(target);
  }, [target]);

  return { setTarget };
};

export default useIntersectionObserver;
