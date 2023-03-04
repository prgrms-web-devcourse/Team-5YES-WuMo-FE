import { Button, Container, Flex, Input, useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdKeyboardArrowLeft, MdMenu, MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { BackNavigationProps } from '@/types/backNavigation';

import PartyUpdate from '../party/partyUpdate/PartyUpdate';

const BackNavigation = ({ title, option }: BackNavigationProps) => {
  const [isShowSearch, setIsShowSearch] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickOption = (option: string) => {
    switch (option) {
      case '검색':
        setIsShowSearch(!isShowSearch);
        break;
      case '메뉴':
        onOpen();
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  return (
    <Nav maxW='maxWidth.mobile' bg='white' zIndex='20'>
      <Flex justify='space-between'>
        <BackButton onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </BackButton>
        <Title>{title}</Title>
        <BackButton
          onClick={() => {
            if (option) onClickOption(option);
          }}>
          {option === '검색' ? <MdSearch /> : option === '메뉴' ? <MdMenu /> : ''}
        </BackButton>
      </Flex>
      {option === '검색' && isShowSearch ? (
        <Flex
          py='1rem'
          justifyContent='space-between'
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}>
          <Input
            placeholder='검색어를 입력하세요.'
            w='80%'
            fontSize='0.75rem'
            padding='0.5rem'
          />
          <Button fontSize='0.875rem'>검색</Button>
        </Flex>
      ) : (
        ''
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
