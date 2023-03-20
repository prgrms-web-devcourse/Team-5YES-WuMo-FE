import { HStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const globalStyle = css`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
      format('woff');
    font-weight: 400;
    font-style: normal;
  }

  body {
    height: 100%;

    .chakra-modal__content-container {
      font-family: 'Pretendard-Regular';

      // react-calendar custom csss
      .react-calendar {
        font-family: 'Pretendard-Regular';
        width: 100%;
        border: none;
        .react-calendar__tile--now {
          background: #ffffff;
          color: #f4cf47;
        }
        .react-calendar__tile--now:enabled:hover,
        .react-calendar__tile--now:enabled:focus {
          background: #f4cf47;
          color: #080808;
        }
        .react-calendar__navigation__label > span {
          font-weight: bold;
        }

        .react-calendar__month-view__weekdays {
          abbr {
            color: #080808;
            font-size: 1.2rem;
            font-weight: 500;
            text-decoration: none;
          }
        }

        .react-calendar__tile--range {
          background-color: #ffeda9;
          color: #080808;
        }

        .react-calendar__tile--rangeStart,
        .react-calendar__tile--rangeEnd {
          border-radius: 4px;
          background-color: #f4cf47;
          color: #080808;
        }

        .react-calendar--selectRange .react-calendar__tile--hover {
          background-color: #f4cf47;
        }

        .react-calendar__tile:disabled {
          color: grey;
          cursor: not-allowed;
        }

        .react-calendar__navigation button:disabled {
          background-color: initial;
          cursor: not-allowed;
        }
      }
    }

    .chakra-modal__content-container::-webkit-scrollbar {
      display: none;
    }
  }

  body::-webkit-scrollbar {
    display: none;
  }

  #root {
    font-family: 'Pretendard-Regular';
    height: 100%;
  }
`;

const CustomScrollX = styled(HStack)`
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #ccc;
  }
`;

export { CustomScrollX, globalStyle };
