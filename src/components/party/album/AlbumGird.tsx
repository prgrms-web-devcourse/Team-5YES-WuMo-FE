import { Center, Grid, GridItem, Image } from '@chakra-ui/react';

const album_dummy_data = [
  {
    image: 'https://via.placeholder.com/140x140',
    id: '1',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    id: '2',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    id: '3',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    id: '4',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    id: '5',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    id: '6',
  },
  {
    image: 'https://via.placeholder.com/140x140',
    id: '7',
  },
];

const AlbumGird = () => {
  return (
    <Grid w='100%' mt='4' templateColumns='repeat(3, 1fr)' gap={6}>
      {album_dummy_data.map(({ id, image }) => (
        <GridItem key={id} w='100%'>
          <Center>
            <Image w='140px' h='100px' borderRadius='lg' src={image} />
          </Center>
        </GridItem>
      ))}
    </Grid>
  );
};

export default AlbumGird;
