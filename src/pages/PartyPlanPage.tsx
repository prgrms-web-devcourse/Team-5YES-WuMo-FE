import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdAdd, MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router-dom';

import PlaceCreateModal from '@/components/placeCreate/PlaceCreateModal';
import PlacePreviewMap from '@/components/placeCreate/search/PlacePreviewMap';
import { PLACES_DUMMY_DATA } from '@/utils/constants/place';
import { getDateTimeText } from '@/utils/formatter';

const PartyPlanPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PlacePreviewMap
        latitude={PLACES_DUMMY_DATA[0].latitude}
        longitude={PLACES_DUMMY_DATA[0].longitude}
      />
      <Box padding='5'>
        <Flex justify='space-between'>
          <Heading as='h3' size='md' display='flex' alignItems='center' gap='1'>
            <MdLocationPin />
            후보지 목록
          </Heading>
          <Button
            variant='ghost'
            size='md'
            onClick={onOpen}
            leftIcon={<MdAdd />}
            color='gray.500'>
            후보지 추가하기
          </Button>
        </Flex>
        {PLACES_DUMMY_DATA.map((place) => (
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
      <PlaceCreateModal isOpen={isOpen} closeModalHandler={onClose} />
    </>
  );
};

export default PartyPlanPage;
