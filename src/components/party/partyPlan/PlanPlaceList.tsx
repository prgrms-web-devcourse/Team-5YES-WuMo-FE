import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { MdAdd, MdLocationPin } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

import { PlanPlaceListProps } from '@/types/place';
import ROUTES from '@/utils/constants/routes';
import { formatDateTime } from '@/utils/formatter';

const PlanPlaceList = ({ places }: PlanPlaceListProps) => {
  const navigate = useNavigate();

  return (
    <Box padding='5'>
      <Flex justify='space-between'>
        <Heading as='h3' size='md' display='flex' alignItems='center' gap='1'>
          <MdLocationPin />
          후보지 목록
        </Heading>
        <Button
          variant='ghost'
          size='md'
          leftIcon={<MdAdd />}
          color='gray.500'
          onClick={() => navigate(ROUTES.PLACE_NEW)}>
          후보지 추가하기
        </Button>
      </Flex>
      {places.map((place) => (
        <Link to={`/place/${place.id}`} key={place.id}>
          <Card
            direction='row'
            overflow='hidden'
            cursor='pointer'
            marginTop='3'
            marginBottom='3'
            height='7rem'>
            <Image src={place.imageURL} alt={place.name} width='30%' objectFit='cover' />
            <CardBody
              display='flex'
              flexDirection='column'
              justifyContent='center'
              gap='1.5'>
              <Heading as='h4' size='sm'>
                {place.name}
              </Heading>
              <Text fontSize='sm'>{place.address}</Text>
              <Text fontSize='xs'>{formatDateTime(place.visitDate)}</Text>
            </CardBody>
            <CardFooter alignItems='center' padding='0' paddingRight='3'>
              <IconButton
                variant='outline'
                borderRadius='50px'
                aria-label='일정에 후보지 추가'
                icon={<MdAdd />}
              />
            </CardFooter>
          </Card>
        </Link>
      ))}
    </Box>
  );
};

export default PlanPlaceList;
