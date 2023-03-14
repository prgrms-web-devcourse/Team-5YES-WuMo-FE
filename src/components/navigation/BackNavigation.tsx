import {
  Button,
  Container,
  Flex,
  Icon,
  Input,
  Tab,
  TabList,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  MdKeyboardArrowLeft,
  MdOutlineCancel,
  MdSearch,
  MdSettings,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { fetchBestRouteList } from '@/api/schedules';
import {
  recoilBestRouteListParams,
  searchResultList,
} from '@/store/recoilRouteListState';
import { BackNavigationProps } from '@/types/backNavigation';
import { BestRouteListParamsType } from '@/types/routeList';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

import MoreMenu from '../base/MoreMenu';
import PartySetting from '../party/update/PartySetting';

const { SEARCH, MENU, MORE } = BACKNAVIGATION_OPTIONS;

const BackNavigation = ({ title, option, moreMenuEvent }: BackNavigationProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [bestRouteParams, setBestRouteParams] = useRecoilState<BestRouteListParamsType>(
    recoilBestRouteListParams
  );
  const setSearchResultList = useSetRecoilState(searchResultList);
  const resetSearchParams = useResetRecoilState(recoilBestRouteListParams);

  const optionList = {
    [SEARCH]: <MdSearch />,
    [MENU]: <MdSettings />,
    [MORE]: <MoreMenu {...moreMenuEvent} />,
  };

  const onClickOption = (option: string) => {
    switch (option) {
      case SEARCH:
        setIsShowSearch(!isShowSearch);
        break;
      case MENU:
        onOpen();
        break;
      default:
        break;
    }
  };

  const handleBestRouteSearch = async () => {
    const searchResult = await fetchBestRouteList(bestRouteParams);
    if (bestRouteParams.searchWord) setSearchWord(bestRouteParams.searchWord);
    setSearchResultList(searchResult);
    setIsShowSearch(!isShowSearch);
  };

  const handleResetSearch = async () => {
    setSearchWord('');
    const resetParams = {
      pageSize: 1000,
      sortType: bestRouteParams.sortType,
    };
    resetSearchParams();
    const searchResult = await fetchBestRouteList(resetParams);
    setSearchResultList(searchResult);
  };

  const navigate = useNavigate();
  return (
    <Nav maxW='maxWidth.mobile' bg='white' zIndex='20' h='3.75rem' userSelect='none'>
      <Flex justify='space-between' align='baseline'>
        <BackButton
          css={css`
            margin-right: 10px;
          `}
          onClick={() => {
            navigate(-1);
            resetSearchParams();
          }}>
          <MdKeyboardArrowLeft />
        </BackButton>
        <Title>{title}</Title>
        <BackButton
          css={css`
            margin-left: 10px;
            direction: rtl;
          `}
          onClick={() => {
            if (option) onClickOption(option);
          }}>
          {option && optionList[option]}
        </BackButton>
      </Flex>
      {searchWord ? (
        <Flex bg='white' alignItems='center' justify='space-between' mx='0.5rem'>
          <Text>
            <strong>&quot;{searchWord}&quot;</strong>의 검색결과
          </Text>
          <Button fontSize='0.8rem' p='2' onClick={handleResetSearch}>
            검색 초기화
          </Button>
        </Flex>
      ) : (
        ''
      )}

      {option === SEARCH && (
        <Tabs
          bg='white'
          zIndex='20'
          colorScheme='red'
          onChange={(index) =>
            setBestRouteParams({
              ...bestRouteParams,
              sortType: index === 0 ? 'NEWEST' : 'LIKES',
            })
          }>
          <TabList>
            <Tab flex='1'>최신순</Tab>
            <Tab flex='1'>좋아요순</Tab>
          </TabList>
        </Tabs>
      )}
      {option === SEARCH && isShowSearch && (
        <Flex
          gap='0.5rem'
          py='1rem'
          bg='white'
          justifyContent='space-between'
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}>
          <Button px='2' onClick={() => setIsShowSearch(!isShowSearch)}>
            <Icon as={MdOutlineCancel} boxSize='4' />
          </Button>
          <Input
            placeholder='지역명 검색 ex) 서울, 경기, 인천'
            w='80%'
            fontSize='0.875rem'
            padding='0.5rem'
            value={bestRouteParams.searchWord}
            onChange={(e) => {
              setBestRouteParams({
                ...bestRouteParams,
                searchWord: e.target.value,
              });
            }}
          />
          <Button fontSize='0.875rem' onClick={handleBestRouteSearch}>
            {SEARCH}
          </Button>
        </Flex>
      )}
      <PartySetting isOpen={isOpen} onClose={onClose} />
    </Nav>
  );
};

const BackButton = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  flex-grow: 1;
  flex: 1;
`;

const Nav = styled(Container)`
  position: fixed;
  width: 100%;
  padding: 1rem;
  top: 0;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  text-align: center;
  flex: 4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

export default BackNavigation;
