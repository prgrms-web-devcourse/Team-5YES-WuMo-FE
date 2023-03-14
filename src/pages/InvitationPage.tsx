import { Flex, Heading, Img, Text, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createRegisterParty, fetchPartyInvitationCode } from '@/api/party';
import { fetchMyProfileInfo } from '@/api/user';
import ConfirmModal from '@/components/base/ConfirmModal';
import Loading from '@/components/base/Loading';
import Toast from '@/components/base/toast/Toast';
import { UserProps } from '@/types/user';
import ROUTES from '@/utils/constants/routes';

import useLocalStorage from '../hooks/useLocalStorage';

const InvitationPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [storedValue] = useLocalStorage('tokens', {});
  const [, setValue] = useLocalStorage('invitation', {});

  useEffect(() => {
    if (!storedValue.accessToken) {
      setValue({ roomId: roomId });
      Toast.show({
        title: '로그인이 필요한 서비스입니다.',
        message: '로그인을 먼저 진행해주세요.',
        type: 'warning',
        duration: 3000,
      });
      navigate(ROUTES.LANDING, { replace: true });
    }
  }, []);

  const { mutateAsync: registerUser } = useMutation(createRegisterParty, {
    onSuccess: () => {
      navigate(`/party/${checkCode.partyId}`, { replace: true });
      Toast.show({
        title: `모임에 참여하게 되었어요!`,
        message: '우측 상단 톱니바퀴를 눌러서 내 역할을 설정해보세요!',
        duration: 3000,
        type: 'info',
      });
    },
    onError: (err) => {
      console.error(err);
      Toast.show({
        message: '이미 참여 중인 모임입니다',
        duration: 3000,
        type: 'error',
      });
      navigate(`/party/${checkCode.partyId}`, { replace: true });
    },
  });

  const { data: checkCode } = useQuery(
    ['checkRoomCode'],
    () => fetchPartyInvitationCode(roomId as string),
    {
      onSuccess: () => {
        onOpen();
      },
      enabled: !!storedValue.accessToken,
    }
  );

  const {
    data: myInformation,
    isError,
    isLoading,
  } = useQuery<UserProps>(['myProfileInfo'], fetchMyProfileInfo, {
    enabled: !!checkCode,
  });

  if (isError) return <></>;
  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <>
      <Flex justify='center' pt='2.25rem'>
        <Img src='/logo-lg.svg' />
      </Flex>
      <ConfirmModal
        isOpen={isOpen}
        closeModalHandler={onClose}
        body={
          <Flex direction='column' align='center' justify='center'>
            <Heading size='lg' mb='1.5rem'>
              파티에 초대되었어요!
            </Heading>
            <Text wordBreak='keep-all' textAlign='center' pb='0.625rem'>
              모임에서 {myInformation?.nickname}님을 초대하셨어요.
            </Text>
            <Text>파티에 참여하시겠습니까?</Text>
          </Flex>
        }
        clickButtonHandler={{
          primary: async () => {
            await registerUser(checkCode.partyId);
          },
          secondary: () => {
            localStorage.removeItem('invitation');
            navigate(ROUTES.MAIN, { replace: true });
          },
        }}
        buttonText={{
          secondary: '거절',
          primary: '참여',
        }}
      />
    </>
  );
};

export default InvitationPage;
