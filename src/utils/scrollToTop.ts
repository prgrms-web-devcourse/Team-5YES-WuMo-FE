export const scrollToTop = () => {
  if (!window.scrollY) return;

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
