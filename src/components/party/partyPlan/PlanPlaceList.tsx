import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { MdAdd, MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { PlanPlaceListProps } from '@/types/place';
import { getDateTimeText } from '@/utils/formatter';

const PlanPlaceList = ({ places, openModalHandler }: PlanPlaceListProps) => {
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
          onClick={openModalHandler}
          leftIcon={<MdAdd />}
          color='gray.500'>
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
            height='7rem'
            _hover={{ backgroundColor: 'gray.100' }}>
            <Image src={place.image} alt={place.name} width='30%' objectFit='cover' />
            <CardBody
              display='flex'
              flexDirection='column'
              justifyContent='center'
              gap='1.5'>
              <Heading as='h4' size='sm'>
                {place.name}
              </Heading>
              <Text fontSize='sm'>{place.address}</Text>
              <Text fontSize='xs'>{getDateTimeText(place.visitDate)}</Text>
            </CardBody>
          </Card>
        </Link>
      ))}
    </Box>
  );
};

export default PlanPlaceList;
