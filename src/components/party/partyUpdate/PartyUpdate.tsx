import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';

import { PartyUpdateProps } from '@/types/party';

const DUMMY_PARTY = {
  id: 1,
  name: '오예스 워크샵',
  startDate: '2023-02-21',
  endDate: '2023-02-22',
  description: '팀 설립 기념 워크샵',
  coverImage: 'https://via.placeholder.com/560x200',
};

const DUMMY_MEMBERS = [
  {
    nickname: '오예스',
    profileImage: 'https://bit.ly/sage-adebayo',
    role: '방장',
  },
  {
    nickname: '육예스',
    profileImage: 'https://bit.ly/ryan-florence',
    role: '총무',
  },
  {
    nickname: '칠예스',
    profileImage: 'https://bit.ly/kent-c-dodds',
    role: '김기사',
  },
];

const PartyUpdate = ({ isOpen, onClose }: PartyUpdateProps) => {
  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent style={{ margin: 0, width: '80%' }}>
        <DrawerCloseButton />
        <DrawerHeader>{DUMMY_PARTY.name}</DrawerHeader>

        <DrawerBody mt='1rem'>
          {DUMMY_MEMBERS.map(({ profileImage, nickname }, index) => (
            // 추후 memberId로 변경예정
            <Flex
              key={index}
              mb='0.75rem'
              p='0.5rem'
              alignItems='center'
              borderBottom='1px solid #eeeeee'
              justify='space-between'
              borderRadius='0.5rem'>
              <Flex alignItems='center' gap='1rem'>
                <Avatar src={profileImage} w='38px' height='38px' />
                <Box>{nickname}</Box>
              </Flex>
              <Button fontSize='1rem' color='primary.red' p='0.5rem'>
                <MdLogout />
              </Button>
            </Flex>
          ))}
        </DrawerBody>

        <DrawerFooter flexDirection='column' gap='1rem'>
          <Button w='100%'>파티 수정</Button>
          <Button w='100%' bg='primary.red'>
            파티 삭제
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PartyUpdate;
