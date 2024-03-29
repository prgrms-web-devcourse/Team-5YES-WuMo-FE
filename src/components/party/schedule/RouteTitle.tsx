import { Flex, Icon, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { MdFavorite, MdFavoriteBorder, MdShare } from 'react-icons/md';

import { createLikeRoute, deleteLikeRoute } from '@/api/route';
import Toast from '@/components/base/toast/Toast';
import useDebounce from '@/hooks/useDebounce';
import { ScheduleType } from '@/types/schedule';

const RouteTitle = ({ scheduleList }: { scheduleList: ScheduleType }) => {
  const didMount = useRef(false);
  const { id, isLiking, partyId } = scheduleList;
  const [likeButtonState, setLikeButtonState] = useState(isLiking);
  const debounceValue = useDebounce<boolean>(likeButtonState, 500);

  const onClickLikeButton = () => {
    setLikeButtonState(!likeButtonState);
    didMount.current = true;
  };

  const copyCurrentUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/best-route/${partyId}`);
    Toast.show({
      title: '',
      message: '해당 일정이 클립보드에 복사되었습니다!',
      type: 'success',
    });
  };

  useEffect(() => {
    if (didMount.current) {
      if (likeButtonState) createLikeRoute(id);
      else deleteLikeRoute(id);
    }
  }, [debounceValue]);

  return (
    <Flex px='1.5rem' justify='space-between' alignItems='center'>
      <Text fontSize='1.2rem' fontWeight='bold'>
        {scheduleList.name}
      </Text>
      <Flex gap='0.5rem'>
        <Icon
          as={likeButtonState ? MdFavorite : MdFavoriteBorder}
          color='primary.red'
          boxSize={6}
          cursor='pointer'
          onClick={onClickLikeButton}
        />
        <Icon as={MdShare} boxSize={6} cursor='pointer' onClick={copyCurrentUrl} />
      </Flex>
    </Flex>
  );
};

export default RouteTitle;
