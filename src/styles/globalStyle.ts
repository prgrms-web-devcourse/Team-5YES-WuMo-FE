import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

const globalStyle = css`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
      format('woff');
    font-weight: 400;
    font-style: normal;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
  }

  #root {
    font-family: 'Pretendard-Regular';
    height: 100%;
  }
  ${emotionReset}
`;

export default globalStyle;
