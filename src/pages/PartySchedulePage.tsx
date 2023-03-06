import { MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import RouteTimeline from '@/components/party/schedule/RouteTimeline';
import ROUTES from '@/utils/constants/routes';

const PartySchedulePage = () => {
  const navigate = useNavigate();
  const onMoveCommentPage = (locationId: number, routeId: number) => {
    navigate(ROUTES.SCHEDULE_COMMENT, { state: { locationId, routeId } });
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
