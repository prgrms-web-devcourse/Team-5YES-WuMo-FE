import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import PartyListCard from './PartyListCard';

const DUMMYDATA = [
  {
    coverImage: 'https://via.placeholder.com/700x500',
    name: '가보자고',
    description:
      '그동안 말만하고 일하느라 바빠서 못간 여행, 이번에 휴가도 맞으니 가보자구~!',
    members: [
      {
        memberId: 1,
        nickname: '오예스1',
        profileImage: 'https://bit.ly/ryan-florence',
      },
      {
        memberId: 2,
        nickname: '오예스2',
        profileImage: 'https://bit.ly/sage-adebayo',
      },
      {
        memberId: 3,
        nickname: '오예스3',
        profileImage: 'https://bit.ly/kent-c-dodds',
      },
    ],
    startDate: '2023-02-21',
    endDate: '2023-02-26',
    id: 1,
  },
  {
    coverImage: 'https://via.placeholder.com/700x500',
    name: '먹부림',
    description: '하루종일 먹기만할 우리들 어디갈지 정해보자',
    members: [
      {
        memberId: 1,
        nickname: '오예스1',
        profileImage: 'https://bit.ly/prosper-baba',
      },
      {
        memberId: 2,
        nickname: '오예스2',
        profileImage: 'https://bit.ly/kent-c-dodds',
      },
    ],
    startDate: '2023-03-21',
    endDate: '2023-04-22',
    id: 2,
  },
  {
    coverImage: 'https://via.placeholder.com/700x500',
    name: '겨울바다여행레츠고',
    description: '강릉으로 겨울바다여행~~ 강원도 너무 재밌겠다ㅎㅎ',
    members: [
      {
        memberId: 1,
        nickname: '오예스1',
        profileImage: 'https://bit.ly/code-beast',
      },
      {
        memberId: 2,
        nickname: '오예스2',
        profileImage: 'https://bit.ly/sage-adebayo',
      },
      {
        memberId: 3,
        nickname: '오예스3',
        profileImage: 'https://bit.ly/ryan-florence',
      },
    ],
    startDate: '2023-01-21',
    endDate: '2023-03-22',
    id: 3,
  },
  {
    coverImage: 'https://via.placeholder.com/700x500',
    name: '퇴사기념',
    description:
      '설명은 필요없다. 떠나자. 설명은 필요없다. 떠나자. 설명은 필요없다. 떠나자. 설명은 필요없다. 떠나자.',
    members: [
      {
        memberId: 1,
        nickname: '민재',
        profileImage: 'https://bit.ly/broken-link',
      },
      {
        memberId: 2,
        nickname: '유리',
        profileImage: 'https://bit.ly/broken-link',
      },
      {
        memberId: 3,
        nickname: '지영',
        profileImage: 'https://bit.ly/broken-link',
      },
      {
        memberId: 3,
        nickname: '천욱',
        profileImage: 'https://bit.ly/broken-link',
      },
    ],
    startDate: '2023-02-21',
    endDate: '2023-02-22',
    id: 4,
  },
  {
    coverImage: 'https://via.placeholder.com/700x500',
    name: '취업기념',
    description: '우모 취업기념 모임, 다들 취할 준비들 해',
    members: [
      {
        memberId: 1,
        nickname: '오예스1',
        profileImage: 'https://bit.ly/ryan-florence',
      },
      {
        memberId: 2,
        nickname: '오예스2',
        profileImage: 'https://bit.ly/sage-adebayo',
      },
      {
        memberId: 3,
        nickname: '오예스3',
        profileImage: 'https://bit.ly/code-beast',
      },
      {
        memberId: 4,
        nickname: '오예스4',
        profileImage: 'https://bit.ly/code-beast',
      },
      {
        memberId: 5,
        nickname: '오예스5',
        profileImage: 'https://bit.ly/code-beast',
      },
      {
        memberId: 6,
        nickname: '오예스6',
        profileImage: 'https://bit.ly/code-beast',
      },
      {
        memberId: 7,
        nickname: '오예스7',
        profileImage: 'https://bit.ly/code-beast',
      },
    ],
    startDate: '2023-04-21',
    endDate: '2023-06-22',
    id: 5,
  },
];

const PartyList = () => {
  const onGoing = DUMMYDATA.filter((party) => new Date(party.endDate) >= new Date());
  const expired = DUMMYDATA.filter((party) => new Date(party.endDate) < new Date());

  return (
    <Box pt='12'>
      <Tabs isFitted colorScheme='red'>
        <TabList pos='fixed' maxW='maxWidth.mobile' w='100%' zIndex='10' bg='white'>
          <Tab>진행중인 모임</Tab>
          <Tab>완료된 모임</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {onGoing.map((party) => (
              <Box key={party.id}>
                <PartyListCard {...party} />
              </Box>
            ))}
          </TabPanel>
          <TabPanel>
            {expired.map((party) => (
              <Box key={party.id}>
                <PartyListCard {...party} />
              </Box>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PartyList;
