import { useIsomorphicLayoutEffect } from 'framer-motion';

function useDocumentTitle(title: string): void {
  useIsomorphicLayoutEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocumentTitle;
