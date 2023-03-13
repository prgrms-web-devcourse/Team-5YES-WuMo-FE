import { useEffect, useState } from 'react';

const useDebounce = <Value>(value: Value, delay?: number): Value => {
  const [debounceValue, setDebounceValue] = useState<Value>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
