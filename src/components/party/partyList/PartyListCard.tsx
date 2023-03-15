import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { PartyListPropsWithMembers } from '@/types/party';

const PartyListCard = ({
  id,
  name,
  startDate,
  endDate,
  description,
  coverImage,
  totalMembers,
  members,
}: PartyListPropsWithMembers) => {
  const navigate = useNavigate();
  const onMovePartyPage = (partyId: number) => {
    navigate(`/party/${partyId}`);
  };
  return (
    <>
      <Card
        key={id}
        cursor='pointer'
        borderRadius='2'
        onClick={() => onMovePartyPage(id)}
        direction={{ base: 'row' }}
        overflow='hidden'
        variant='unstyled'>
        <Image
          fallbackSrc='/skeleton.svg'
          objectFit='cover'
          borderRadius='2'
          minW={{ base: '10rem' }}
          maxW={{ base: '10rem' }}
          minH='8.125rem'
          maxH='8.125rem'
          src={coverImage ? coverImage : '/logo.svg'}
        />

        <Stack maxW='calc(100% - 10rem)' justifyContent='space-between' px='4' pb='3'>
          <CardBody>
            <Heading noOfLines={1} size='md'>
              {name}
            </Heading>
            <Text mt='2' fontSize='xs'>{`${dayjs(startDate).format('YY.MM.DD')} - ${dayjs(
              endDate
            ).format('YY.MM.DD')}`}</Text>
            <Text
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='nowrap'
              wordBreak='break-all'
              py='2'>
              {description}
            </Text>
          </CardBody>

          <CardFooter>
            {members.map((member) => (
              <Flex alignItems='center' key={member.memberId}>
                <AvatarGroup max={3}>
                  <Avatar
                    size='sm'
                    key={member.memberId}
                    src={member.profileImage === null ? undefined : member.profileImage}
                  />
                </AvatarGroup>
                {totalMembers - 1 > 0 && (
                  <>
                    <MdAdd />
                    {totalMembers - 1}
                  </>
                )}
              </Flex>
            ))}
          </CardFooter>
        </Stack>
      </Card>
      <Divider py='2' />
    </>
  );
};

export default PartyListCard;
