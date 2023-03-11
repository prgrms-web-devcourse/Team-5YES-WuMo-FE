import { MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import RouteTimeline from '@/components/party/schedule/RouteTimeline';

const PartySchedulePage = () => {
  const navigate = useNavigate();
  const onMoveCommentPage = (locationId: number, partyId: number) => {
    navigate(`/party/${partyId}/schedule-comment`, { state: { locationId } });
  };

  return (
    <>
      <RouteTimeline
        onClickHandler={onMoveCommentPage}
        routerButton={<MdArrowForwardIos />}
        isPublic={false}
      />
    </>
  );
};

export default PartySchedulePage;
