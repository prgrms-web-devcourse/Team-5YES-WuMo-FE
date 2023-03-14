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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  deleteParty,
  deleteWithdrawalParty,
  fetchPartyInformation,
  fetchPartyMembers,
  fetchPartyMembersMeInfo,
} from '@/api/party';
import { patchOwnRole } from '@/api/role';
import ConfirmModal from '@/components/base/ConfirmModal';
import Loading from '@/components/base/Loading';
import Toast from '@/components/base/toast/Toast';
import { PartyInformationType, PartyMemberProps, PartyModalProps } from '@/types/party';
import { getGitEmoji } from '@/utils/constants/emoji';
import { TOAST_MESSAGE } from '@/utils/constants/messages';
import { partyRoleList } from '@/utils/constants/party';
import ROUTES from '@/utils/constants/routes';

import MemberList from './MemberList';
import PartyUpdateModal from './PartyUpdateModal';

const PartySetting = ({ isOpen, onClose }: PartyModalProps) => {
  const { partyId } = useParams();
  const navigate = useNavigate();

  const selected = {
    color: 'primary.red',
    fontWeight: 'bold',
    backgroundColor: 'gray.100',
    boxShadow: '0 0 0 2px #ea5148 inset',
  };

  const queryClient = useQueryClient();
  const { mutateAsync: handleRemoveParty } = useMutation(deleteParty);
  const { mutate: handleWithdrawalParty } = useMutation(deleteWithdrawalParty);
  const { mutateAsync: updateRole } = useMutation(patchOwnRole);

  const {
    data: partyInformation,
    isLoading: partyInformationLoading,
    isError: partyInformationError,
  } = useQuery<PartyInformationType>(['partyInformation', partyId], () =>
    fetchPartyInformation(Number(partyId))
  );

  const {
    data: partyMemberMeInfo,
    isLoading: partyMemberMeInfoLoading,
    isError: partyMemberMeInfoError,
  } = useQuery<PartyMemberProps>(['partyMemberMeInfo', partyId], () =>
    fetchPartyMembersMeInfo(Number(partyId))
  );

  const {
    data: partyMemberList,
    isLoading: partyMemberListLoading,
    isError: partyMemberListError,
  } = useQuery<{
    members: PartyMemberProps[];
    lastId: number;
    totalMembers: number;
  }>(['partyUserList', partyId], () => fetchPartyMembers(Number(partyId)));

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [removePartyModalOpen, setRemovePartyModalOpen] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    if (partyMemberMeInfo) {
      setRole(partyMemberMeInfo.role);
    }
  }, [partyMemberMeInfo]);

  if (partyInformationLoading || partyMemberMeInfoLoading || partyMemberListLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (partyInformationError || partyMemberMeInfoError || partyMemberListError)
    return <></>;

  const onCloseSettingDrawer = () => {
    onClose();
  };

  const handlePartyModal = (type: string) => {
    if (type === 'update') {
      onClose();
      setIsUpdateModalOpen(true);
    } else if (type === 'remove') {
      setRemovePartyModalOpen(true);
    }
  };

  const handleUpdateRole = async () => {
    const partyId = partyInformation?.id;
    const rolePatchAPIBody = {
      role,
    };

    await updateRole(
      { partyId, rolePatchAPIBody },
      {
        onSuccess: () => {
          Toast.show({
            message: TOAST_MESSAGE.SUCCESS_ROLE_UPDATE,
            type: 'success',
          });
          return queryClient.invalidateQueries(['partyUserList']);
        },
      }
    );
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement='right' onClose={onCloseSettingDrawer}>
        <DrawerOverlay />
        <DrawerContent style={{ margin: 0, width: '80%' }}>
          <DrawerCloseButton />
          <DrawerHeader>{partyInformation?.name}</DrawerHeader>

          <DrawerBody>
            <Text fontSize='0.875rem' mb='2' color='#808080'>
              멤버 ({partyMemberList?.totalMembers}명)
            </Text>
            <MemberList
              partyMemberList={partyMemberList}
              partyMemberMeInfo={partyMemberMeInfo}
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

          <DrawerFooter flexDirection='row' gap='1rem' pb='2rem'>
            {partyMemberMeInfo.isLeader ? (
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
      {partyInformation.id !== 0 ? (
        <>
          <PartyUpdateModal
            partyId={partyId}
            partyDetail={partyInformation}
            isOpen={isUpdateModalOpen}
            onClose={() => {
              setIsUpdateModalOpen(false);
            }}
          />
          <ConfirmModal
            isOpen={removePartyModalOpen}
            closeModalHandler={() => setRemovePartyModalOpen(false)}
            body={
              <Flex direction='column' align='center' pt='0'>
                {partyMemberMeInfo.isLeader
                  ? `${partyInformation.name} 모임을 삭제할까요?`
                  : `${partyInformation.name} 모임에서 나갈까요?`}
              </Flex>
            }
            clickButtonHandler={{
              primary: async () => {
                if (partyMemberMeInfo.isLeader) {
                  await handleRemoveParty(partyInformation.id, {
                    onSuccess: () => {
                      return queryClient.invalidateQueries(['onGoingPartyList']);
                    },
                  });
                } else {
                  await handleWithdrawalParty(partyInformation.id, {
                    onSuccess: () => {
                      return queryClient.invalidateQueries(['onGoingPartyList']);
                    },
                  });
                }
                setRemovePartyModalOpen(false);
                navigate(ROUTES.PARTY_LIST, { replace: true });
              },
            }}
            buttonText={
              partyMemberMeInfo.isLeader
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
