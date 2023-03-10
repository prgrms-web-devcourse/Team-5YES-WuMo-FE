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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { deleteParty, deleteWithdrawalParty } from '@/api/party';
import { patchOwnRole } from '@/api/role';
import ConfirmModal from '@/components/base/ConfirmModal';
import Toast from '@/components/base/toast/Toast';
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

  const queryClient = useQueryClient();
  const { mutate: handleRemoveParty } = useMutation(deleteParty);
  const { mutate: handleWithdrawalParty } = useMutation(deleteWithdrawalParty);

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
      Toast.show({
        message: '????????? ??????????????? ??????????????????.',
        type: 'success',
      });
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
              ?????? ({getPartyMembersList.totalMembers}???)
            </Text>
            <MemberList partyId={getPartyDetail.id} />
            <Text fontSize='0.875rem' mb='2' color='#808080'>
              ??? ?????? ??????
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
                placeholder='?????? ????????????'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <Button fontSize='sm' py='4' fontWeight='normal' onClick={handleUpdateRole}>
                ??????
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
                  ?????? ??????
                </Button>
                <CustomButton
                  onClick={() => handlePartyModal('remove')}
                  bg='primary.red'
                  _hover={{
                    bg: 'primary.redHover',
                  }}>
                  ?????? ??????
                </CustomButton>
              </>
            ) : (
              <CustomButton
                onClick={() => handlePartyModal('remove')}
                bg='primary.red'
                _hover={{
                  bg: 'primary.redHover',
                }}>
                ???????????? ?????????
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
                  ? `${getPartyDetail.name} ????????? ????????????????`
                  : `${getPartyDetail.name} ???????????? ?????????????`}
              </Flex>
            }
            clickButtonHandler={{
              primary: () => {
                if (getPartyMeRole.isLeader) {
                  handleRemoveParty(getPartyDetail.id, {
                    onSuccess: () => {
                      return queryClient.invalidateQueries(['onGoingPartyList']);
                    },
                  });
                } else {
                  handleWithdrawalParty(getPartyDetail.id, {
                    onSuccess: () => {
                      return queryClient.invalidateQueries(['onGoingPartyList']);
                    },
                  });
                }
                // {
                //   getPartyMeRole.isLeader
                //     ? deleteParty(getPartyDetail.id)
                //     : deleteWithdrawalParty(getPartyDetail.id);
                // }
                setUpdated(true);
                setRemovePartyModalOpen(false);
                navigate(ROUTES.PARTY_LIST, { replace: true });
              },
            }}
            buttonText={
              getPartyMeRole.isLeader
                ? {
                    secondary: '??????',
                    primary: '??????',
                  }
                : {
                    secondary: '??????',
                    primary: '?????????',
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
