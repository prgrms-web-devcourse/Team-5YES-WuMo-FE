import {
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
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { deleteParty, deleteWithdrawalParty } from '@/api/party';
import { patchOwnRole } from '@/api/role';
import ConfirmModal from '@/components/base/ConfirmModal';
import {
  isUpdateData,
  partyDetailState,
  partyMemberListState,
  partyMeRoleState,
} from '@/store/recoilPartyState';
import {
  PartyInformationType,
  PartyMemberListProps,
  PartyMemberProps,
  PartyModalProps,
} from '@/types/party';
import { getGitEmoji } from '@/utils/constants/emoji';
import { partyRoleList } from '@/utils/constants/party';
import ROUTES from '@/utils/constants/routes';

import MemberList from './MemberList';
import PartyUpdateModal from './PartyUpdateModal';

const PartySetting = ({ isOpen, onClose }: PartyModalProps) => {
  const selected = {
    color: 'primary.red',
    fontWeight: 'bold',
    backgroundColor: 'gray.100',
    boxShadow: '0 0 0 2px #ea5148 inset',
  };

  const navigate = useNavigate();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [removePartyModalOpen, setRemovePartyModalOpen] = useState(false);

  const getPartyMembersList = useRecoilValue<PartyMemberListProps>(partyMemberListState);
  const getPartyMeRole = useRecoilValue<PartyMemberProps>(partyMeRoleState);
  const getPartyDetail = useRecoilValue<PartyInformationType>(partyDetailState);
  const setUpdated = useSetRecoilState(isUpdateData);

  const [role, setRole] = useState(getPartyMeRole.role);

  const handlePartyModal = (type: string) => {
    if (type === 'update') {
      onClose();
      setIsUpdateModalOpen(true);
    } else if (type === 'remove') {
      setRemovePartyModalOpen(true);
    }
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
            <MemberList
              members={getPartyMembersList.members}
              partyId={getPartyDetail.id}
            />
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
                    onClick={() => setRole(text)}
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
            {getPartyMeRole.isLeader ? (
              <>
                <Button
                  onClick={() => handlePartyModal('update')}
                  w='100%'
                  bg='primary.yellow'>
                  모임 수정
                </Button>
                <CustomButton
                  onClick={() => handlePartyModal('remove')}
                  bg='primary.red'
                  _hover={{
                    bg: 'primary.redHover',
                  }}>
                  모임 삭제
                </CustomButton>
              </>
            ) : (
              <CustomButton
                onClick={() => handlePartyModal('remove')}
                bg='primary.red'
                _hover={{
                  bg: 'primary.redHover',
                }}>
                모임에서 나가기
              </CustomButton>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {getPartyDetail.id !== 0 ? (
        <>
          <PartyUpdateModal
            partyDetail={getPartyDetail}
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
          />
          <ConfirmModal
            isOpen={removePartyModalOpen}
            closeModalHandler={() => setRemovePartyModalOpen(false)}
            body={
              <Flex direction='column' align='center' pt='0'>
                {getPartyMeRole.isLeader
                  ? `${getPartyDetail.name} 모임을 삭제할까요?`
                  : `${getPartyDetail.name} 모임에서 나갈까요?`}
              </Flex>
            }
            clickButtonHandler={{
              primary: () => {
                {
                  getPartyMeRole.isLeader
                    ? deleteParty(getPartyDetail.id)
                    : deleteWithdrawalParty(getPartyDetail.id);
                }
                setRemovePartyModalOpen(false);
                navigate(ROUTES.PARTY_LIST, { replace: true });
                setUpdated(true);
              },
            }}
            buttonText={
              getPartyMeRole.isLeader
                ? {
                    secondary: '취소',
                    primary: '삭제',
                  }
                : {
                    secondary: '취소',
                    primary: '나가기',
                  }
            }
          />
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default PartySetting;

const CustomButton = styled(Button)`
  width: 100%;
  color: white;
`;
