import {
  Button,
  Container,
  Flex,
  Icon,
  Input,
  Tab,
  TabList,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
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
import { useRecoilState, useSetRecoilState } from 'recoil';

import { fetchBestRouteList } from '@/api/schedules';
import {
  bestRouteListSortSearchState,
  searchResultList,
} from '@/store/recoilRouteListState';
import { BackNavigationProps } from '@/types/backNavigation';
import { BestRouteListSortSearchProps } from '@/types/routeList';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

import MoreMenu from '../base/MoreMenu';
import PartyUpdate from '../party/partyUpdate/PartyUpdate';

const { SEARCH, MENU, MORE } = BACKNAVIGATION_OPTIONS;

const BackNavigation = ({ title, option, moreMenuEvent }: BackNavigationProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [bestRouteData, setBestRouteData] = useRecoilState<BestRouteListSortSearchProps>(
    bestRouteListSortSearchState
  );
  const setSearchResultList = useSetRecoilState(searchResultList);

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
    const data = await fetchBestRouteList(bestRouteData);
    setSearchResultList(data);
  };

  const navigate = useNavigate();
  return (
    <Nav maxW='maxWidth.mobile' bg='white' zIndex='20' h='3.75rem' userSelect='none'>
      <Flex justify='space-between' mb='0.5rem'>
        <BackButton onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </BackButton>
        <Title>{title}</Title>
        <BackButton
          onClick={() => {
            if (option) onClickOption(option);
          }}>
          {option && optionList[option]}
        </BackButton>
      </Flex>
      {option === SEARCH && (
        <Tabs
          bg='white'
          zIndex='20'
          colorScheme='red'
          onChange={(index) =>
            setBestRouteData({
              ...bestRouteData,
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
            value={bestRouteData.searchWord}
            onChange={(e) => {
              setBestRouteData({
                ...bestRouteData,
                searchWord: e.target.value,
              });
            }}
          />
          <Button fontSize='0.875rem' onClick={handleBestRouteSearch}>
            {SEARCH}
          </Button>
        </Flex>
      )}
      <PartyUpdate isOpen={isOpen} onClose={onClose} />
    </Nav>
  );
};

const BackButton = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  padding-top: 0.25rem;
`;

const Nav = styled(Container)`
  position: fixed;
  width: 100%;
  padding: 1rem;
  top: 0;
`;

const Title = styled.h1`
  position: absolute;
  font-size: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
`;

export default BackNavigation;
