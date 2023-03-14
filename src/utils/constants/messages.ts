export const FORM_ERROR_MESSAGES = {
  EMAIL_REQUIRED: '이메일을 입력해주세요.',
  EMAIL_PATTERN: '올바른 이메일 형식이 아닙니다.',
  EMAIL_DUPLICATED: '이미 있는 이메일입니다.',
  EMAIL_CERTIFIED: '이메일 인증이 필요합니다.',
  NICKNAME_REQUIRED: '닉네임을 입력해주세요.',
  NICKNAME_INWORD: '한글은 단어로 입력해주세요.',
  NICKNAME_PATTERN: '한글, 영어, 숫자만 입력해주세요.',
  NICKNAME_DUPLICATED: '이미 있는 닉네임입니다.',
  PASSWORD_REQUIRED: '비밀번호를 작성해주세요.',
  PASSWORD_PATTERN: '숫자, 문자를 조합하여 작성해주세요',
  CONFIRM_PASSWORD_REQUIRED: '비밀번호 재확인이 필요합니다.',
  CONFIRM_PASSWORD: '비밀번호가 다릅니다.',
  SPACING: '공백을 포함할 수 없습니다.',
  SPEACIAL: '영어, 숫자만 입력해주세요.',
  DUPLICATE: '중복을 확인해주세요.',
  MIN: (min: number) => `최소 ${min}글자 이상 작성해주세요.`,
  MAX: (max: number) => `최대 ${max}글자까지만 가능합니다.`,
} as const;

export const PLACE_ERROR_MESSAGES = {
  KEYWORD_REQUIRED: '키워드를 입력해 주세요.',
  NO_RESULT: '검색 결과가 존재하지 않습니다.',
  RESPONSE_ERROR: '검색 중 오류가 발생했습니다.',
  VISIT_DATE_REQUIRED: '방문 예정일을 입력해 주세요.',
  EXPECTED_COST_REQUIRED: '예상 비용을 입력해 주세요.',
  IMAGE_FILE_REQUIRED: '대표 이미지를 선택해 주세요.',
  COMMENT_REQUIRED: '사진을 추가하거나 내용을 입력해 주세요.',
} as const;

export const TOAST_MESSAGE = {
  SUCCESS_ROLE_UPDATE: '역할이 정상적으로 변경되었습니다.',
  SUCCESS_PARTY_REMOVE: '모임이 정상적으로 삭제되었습니다.',
  SUCCESS_PARTY_UPDATE: '모임이 정상적으로 수정되었습니다.',
  SUCCESS_PARTY_CREATE: '모임이 정상적으로 생성되었습니다.',
} as const;
