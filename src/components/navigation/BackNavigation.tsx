import { Container, Flex, useDisclosure } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MdKeyboardArrowLeft, MdSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { BackNavigationProps } from '@/types/backNavigation';
import { BACKNAVIGATION_OPTIONS } from '@/utils/constants/navigationItem';

import MoreMenu from '../base/MoreMenu';
import SearchInput from '../base/SearchInput';
import PartySetting from '../party/update/PartySetting';

const { SEARCH, MENU, MORE } = BACKNAVIGATION_OPTIONS;

const BackNavigation = ({
  partyId,
  title,
  option,
  moreMenuEvent,
}: BackNavigationProps) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모임 구성원 Drawer 열

  const optionList = {
    [MENU]: <MdSettings />,
    [MORE]: <MoreMenu {...moreMenuEvent} />,
  };

  return (
    <Nav maxW='maxWidth.mobile' bg='white' zIndex='20' h='3.75rem' userSelect='none'>
      <Flex justify='space-between' align='center'>
        <BackButton onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </BackButton>
        <Title>{title}</Title>
        <BackButton
          css={css`
            direction: rtl;
          `}
          onClick={onOpen}>
          {option && optionList[option]}
        </BackButton>
      </Flex>
      {option === SEARCH && <SearchInput />}
      {partyId && <PartySetting partyId={partyId} isOpen={isOpen} onClose={onClose} />}
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
