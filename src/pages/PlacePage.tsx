import { useParams } from 'react-router-dom';

const PlacePage = () => {
  const { id } = useParams();
  return <div>{id} 후보지 페이지</div>;
};

export default PlacePage;
