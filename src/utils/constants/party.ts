export const partyRoleList = [
  {
    text: '총무',
    imageID: '1f4b8',
  },
  {
    text: '운전기사',
    imageID: '1f697',
  },
  {
    text: '분위기 메이커',
    imageID: '1f3a4',
  },
  {
    text: '길잡이',
    imageID: '1f4cd',
  },
  {
    text: 'DJ',
    imageID: '1f3b5',
  },
  {
    text: '알리미',
    imageID: '1f514',
  },
  {
    text: '리더',
    imageID: '1f60e',
  },
  {
    text: '예약',
    imageID: '1f4de',
  },
  {
    text: '사진기사',
    imageID: '1f4f8',
  },
];

export const PLACE_DESCRIPTION_MAX_LENGTH = 50;

export const partyOptions = {
  onGoing: {
    partyStatus: 'ONGOING',
    emptyPartyText: '진행중인',
  },
  completed: {
    partyStatus: 'COMPLETED',
    emptyPartyText: '완료된',
  },
  all: {
    partyStatus: 'ALL',
    emptyPartyText: '참여중인',
  },
} as const;
