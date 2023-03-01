import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { PartyListPropsWithMembers } from '@/types/party';
import ROUTES from '@/utils/constants/routes';

const PartyListCard = ({
  id,
  name,
  startDate,
  endDate,
  description,
  coverImage,
  members,
}: PartyListPropsWithMembers) => {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    console.log(id);
    navigate(ROUTES.SCHEDULE);
  };
  return (
    <Card
      key={id}
      cursor='pointer'
      onClick={() => handleClick(id)}
      py='10'
      borderBottom='1px'
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'>
      <Image
        objectFit='cover'
        borderRadius={20}
        maxW={{ base: '100%', sm: '200px' }}
        src={coverImage}
        alt='Caffe Latte'
      />

      <Stack w='100%' justifyContent='space-between' px='4' pb='3'>
        <CardBody>
          <Flex alignItems='center' justifyContent='space-between'>
            <Heading size='md'>{name}</Heading>
            <Text fontSize='xs'>{`${startDate.slice(2)} - ${endDate.slice(2)}`}</Text>
          </Flex>

          <Text py='2'>{description}</Text>
        </CardBody>

        <CardFooter>
          <AvatarGroup size='sm' max={3}>
            {members.map((member) => (
              <Avatar
                key={member.memberId}
                name={member.nickname}
                src={member.profileImage}
              />
            ))}
          </AvatarGroup>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default PartyListCard;
