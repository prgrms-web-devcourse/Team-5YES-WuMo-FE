import { MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import RouteTimeline from '@/components/party/schedule/RouteTimeline';
import ROUTES from '@/utils/constants/routes';

const PartySchedulePage = () => {
  const navigate = useNavigate();
  const onMoveCommentPage = () => {
    navigate(ROUTES.SCHEDULE_COMMENT);
  };
  return (
    <>
      <RouteTimeline
        onClickHandler={onMoveCommentPage}
        routerButton={<MdArrowForwardIos />}
      />
    </>
  );
};

export default PartySchedulePage;
