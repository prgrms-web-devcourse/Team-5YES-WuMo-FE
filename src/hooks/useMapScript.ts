import { useEffect, useState } from 'react';

const useMapScript = () => {
  const [script, setScript] = useState<HTMLScriptElement>();

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_API_JS_KEY
    }&libraries=services&autoload=false`;

    document.head.appendChild(script);

    setScript(script);
  }, []);

  return { script };
};

export default useMapScript;
