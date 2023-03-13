import { Box, Heading, Image } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

type BestRouteItem = {
  name: string;
  routeId: number;
  image: string;
  dragging: boolean;
};

const BestRouteListItem = ({ name, routeId, image, dragging }: BestRouteItem) => {
  const navigate = useNavigate();

  const onMoveRoutePage = (id: string | number) => {
    navigate(`/route/${id}`);
  };

  return (
    <>
      <Box
        key={routeId}
        onClick={() => !dragging && onMoveRoutePage(routeId)}
        outline='none'
        h='200px'>
        <Box
          zIndex='10'
          pos='absolute'
          top='0'
          bottom='0'
          left='0'
          right='0'
          m='0.625rem 1.25rem'
          bg='blackAlpha.300'
        />
        <Image src={image} w='100%' maxH='12.5rem' h='100%' mt='10px' />
        <Box
          zIndex='20'
          pos='absolute'
          top='calc(50% - 0.625rem)'
          left='calc(50% - 6.25rem)'
          w='12.5rem'
          textAlign='center'
          color='white'>
          <StyleHeading size='md' noOfLines={1} w='12.5rem'>
            {name}
          </StyleHeading>
        </Box>
      </Box>
    </>
  );
};

export default BestRouteListItem;

const StyleHeading = styled(Heading)`
  text-shadow: 2px 2px 2px gray;
`;
