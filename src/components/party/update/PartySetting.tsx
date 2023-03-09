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
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { patchOwnRole } from '@/api/role';
import {
  isUpdateData,
  partyDetailState,
  partyMemberListState,
} from '@/store/recoilPartyState';
import { PartyListProps, PartyMemberListProps, PartyModalProps } from '@/types/party';
import { partyRoleList } from '@/utils/constants/party';
import { getGitEmoji } from '@/utils/emoji';

import PartyUpdateModal from './PartyUpdateModal';

const PartySetting = ({ isOpen, onClose }: PartyModalProps) => {
  const selected = {
    color: 'primary.red',
    fontWeight: 'bold',
    backgroundColor: 'gray.100',
    boxShadow: '0 0 0 2px #ea5148 inset',
  };

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const getPartyMembersList = useRecoilValue<PartyMemberListProps>(partyMemberListState);
  const getPartyDetail = useRecoilValue<PartyListProps>(partyDetailState);
  const setUpdated = useSetRecoilState(isUpdateData);

  const [role, setRole] = useState('');

  const onClickRole = (role: string) => {
    setRole(role);
  };

  const onClickUpdateParty = () => {
    onClose();
    setIsUpdateModalOpen(true);
  };

  const onCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdateRole = async () => {
    const rolePatchAPIBody = {
      role,
    };

    const data = await patchOwnRole(getPartyDetail.id, rolePatchAPIBody);
    if (data) {
      alert('역할이 정상적으로 설정되었어요.');
      setUpdated(true);
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent style={{ margin: 0, width: '80%' }}>
          <DrawerCloseButton />
          <DrawerHeader>{getPartyDetail.name}</DrawerHeader>

          <DrawerBody>
            <Text fontSize='0.875rem' mb='2' color='#808080'>
              멤버 ({getPartyMembersList.totalMembers}명)
            </Text>
            <Box mb='10' maxH='240px' overflowY='scroll'>
              {getPartyMembersList.members.map(
                ({ memberId, nickname, role, profileImage }) => (
                  <Flex
                    key={memberId}
                    p='0.75rem'
                    alignItems='center'
                    borderBottom='1px solid #eeeeee'
                    justify='space-between'
                    borderRadius='0.5rem'>
                    <Flex alignItems='center' gap='1rem'>
                      <Avatar src={profileImage} w='38px' height='38px' />
                      <Box>
                        <Text>{nickname}</Text>
                        <Text fontSize='0.75rem' color='#808080'>
                          {role}
                        </Text>
                      </Box>
                    </Flex>
                    <Button fontSize='1rem' color='primary.red' p='0.5rem'>
                      <MdLogout />
                    </Button>
                  </Flex>
                )
              )}
            </Box>
            <Text fontSize='0.875rem' mb='2' color='#808080'>
              내 역할 설정
            </Text>
            <Box mb='4'>
              <Grid
                templateColumns='repeat(3, 1fr)'
                templateRows='repeat(3, 1fr)'
                gap='3'>
                {partyRoleList.map(({ text, imageID }) => (
                  <GridItem
                    key={imageID}
                    cursor='pointer'
                    borderRadius='2xl'
                    py='3'
                    backgroundColor='gray.50'
                    _hover={{
                      backgroundColor: 'gray.100',
                      fontWeight: 'bold',
                    }}
                    onClick={() => onClickRole(text)}
                    {...(role === text && selected)}>
                    <Flex
                      direction='column'
                      align='center'
                      justify='center'
                      gap='2'
                      fontSize='0.75rem'>
                      <Image src={getGitEmoji(imageID)} alt={text} width='1.5rem' />
                      {text}
                    </Flex>
                  </GridItem>
                ))}
              </Grid>
            </Box>
            <HStack>
              <Input
                p='4'
                size='sm'
                border='0.0625rem solid #cfcfcf'
                focusBorderColor='primary.red'
                borderRadius='8'
                placeholder='직접 입력하기'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <Button fontSize='sm' py='4' fontWeight='normal' onClick={handleUpdateRole}>
                수정
              </Button>
            </HStack>
          </DrawerBody>

          <DrawerFooter flexDirection='row' gap='1rem'>
            <Button onClick={onClickUpdateParty} w='100%' bg='primary.yellow'>
              모임 수정
            </Button>
            <Button
              w='100%'
              bg='primary.red'
              color='white'
              _hover={{
                bg: 'primary.redHover',
              }}>
              {/* 파티장은 모임삭제 */}
              {/* 파티원은 모임탈퇴 */}
              모임 삭제
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {getPartyDetail.id !== 0 ? (
        <PartyUpdateModal
          partyDetail={getPartyDetail}
          isOpen={isUpdateModalOpen}
          onClose={onCloseUpdateModal}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default PartySetting;
