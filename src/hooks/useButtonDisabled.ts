import { useEffect, useState } from 'react';

const useButtonDisabled = (dep: string[]) => {
  const isEmptyString = (value: string) => value !== '' && value !== 'undefined';
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (dep.every(isEmptyString)) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, dep);

  return buttonDisabled;
};

export default useButtonDisabled;
