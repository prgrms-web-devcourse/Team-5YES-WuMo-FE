<h1><img width="25px" height="25px" src="https://user-images.githubusercontent.com/63575891/225193442-956c60ce-d81e-425c-982f-42de4acf0a0c.png" alt="WuMo logo"/> WuMo(우리들의 모임)</h1>
  

> 5YES's Team Project WuMo Front-end
>
> 🔗 배포 링크 https://5yes-wumo.vercel.app/
>
> 🍩 [Back-end Repository](https://github.com/prgrms-web-devcourse/Team-5YES-WuMo-BE)


<div align="center">
  <img height="100px" src="https://user-images.githubusercontent.com/39071638/220715210-18e29cdc-b12e-470a-8e11-ed2122091e15.png" alt="WuMo logo" />
  <h3>가족, 친구와 모임 일정을 계획하고 공유하는 서비스</h3>
  <p>우리들의 모임을 관리하는 플랫폼, WuMo</p>
</div>

```
평소 여행이나 모임을 계획할 때 어떻게 하시나요?
그룹채팅방에서는 모임과 상관없는 이야기도 오가면서 모임에 필요한 장소나 사진 등이 잊히기 쉽습니다.
그렇다면 모임과 관련된 내용만 모아보면서 함께 계획을 완성하고 추억을 기록할 도구가 있다면 어떨까요? 
```

<br />

## ⭐️ 주요 기능

- 모임을 만들어 친구를 초대한다.
- 가고 싶은 장소를 등록하여 의견을 공유한다.
- 장소가 결정되면 후보지를 일정으로 등록한다.
- 일정을 하나의 타임라인으로 묶어 한눈에 파악한다.
- 다녀온 장소의 피드를 작성하여 추억을 기록한다.
- 영수증 기능을 활용하여 정산할 때 도움을 받을 수 있다.
- 다른 사람들과 일정을 공유하거나 지역을 검색해 추천 일정을 확인한다.
- 마음에 드는 일정을 관심 목록에 추가하고 모아본다.

<details>
 <summary><h3>기능 미리보기</h3></summary>
 <details>
 <summary><h4>이메일 회원가입 및 로그인</h4></summary>
 <img width="40%" src="https://user-images.githubusercontent.com/63575891/225982229-65db4553-f08c-4f6a-a636-250e34e1a91d.gif" alt="이메일 회원가입 및 로그인" />
 </details>
 <details>
 <summary><h4>모임 추가 및 관리</h4></summary>
 <img width="40%" src="https://user-images.githubusercontent.com/63575891/225985663-f4c0ae2e-cc8a-4662-ae6d-faa5226e9ce4.gif" alt="모임 추가 및 관리"/>
 </details>
 <details>
 <summary><h4>초대 및 후보지 추가</h4></summary>
 <img width="40%" src="https://user-images.githubusercontent.com/63575891/225984576-2644357e-858f-4cc7-82b6-77add4b6bc28.gif" alt="초대 및 후보지 추가" />
 </details>
 <details>
 <summary><h4>일정 관리 및 피드</h4></summary>
 <img width="40%" src="https://user-images.githubusercontent.com/63575891/225986588-e84deef4-c99b-4aab-9164-6161698f0298.gif" alt="일정 관리 및 피드">
 </details>
 <details>
 <summary><h4>추천 일정 및 관심 목록</h4></summary>
 <img width="40%" src="https://user-images.githubusercontent.com/63575891/225985170-7012e7ce-790c-4d20-bfdf-b0bf5ed7edd2.gif" alt="추천 일정 및 관심 목록"/>
 </details>
</details>

<br />

## 🍩 팀 소개

|[김민재](https://github.com/mxx-kor)|[김유리](https://github.com/glassk)|[유지영](https://github.com/YJZero)|[주천욱](https://github.com/chunwookJoo)|
|---|---|---|---|
| <div align="center"><img height="150px" src="https://avatars.githubusercontent.com/mxx-kor" alt="mxx-kor"/></div> | <div align="center"><img height="150px" src="https://avatars.githubusercontent.com/glassk" alt="glassk" /></div> | <div align="center"><img height="150px" src="https://avatars.githubusercontent.com/YJZero" alt="YJZero" /></div> | <div align="center"><img height="150px" src="https://avatars.githubusercontent.com/chunwookJoo" alt="chunwookJoo" /></div> |
| - 회원가입 및 로그인<br />- 프로필 조회 및 수정<br />- 모임 목록   | - 모임 계획<br />- 후보지 및 댓글                                | - 메인 페이지<br />- 모임 일정 및 피드<br />- 모임 초대            | - 추천 일정, 관심 일정 목록<br />- 모임 추가 및 관리<br />- 랜딩, 404 페이지 |
| - react-hook-form을 활용한 리렌더링 최소화, 유효성 검증 구현<br />- axios interceptor를 활용하여 API 요청, 에러, 응답 및 JWT 토큰 관리 | - kakao maps API를 활용한 지도 뷰 및 검색 기능 구현<br />- 프로젝트 초기 세팅<br /> - 백엔드 서버 부하를 고려한 대용량 이미지 압축 | - tanstack query의 에러 핸들링과 refetch를 활용한 데이터 통신<br />- 컴포넌트 재사용성을 위한 Modal 등 공통 컴포넌트 분리<br />- react-router-dom의 동적 라우팅을 이용한 초대 기능 구현 | - 추천 일정 좋아요 디바운싱 커스텀 훅 분리<br />- recoil을 활용한 모임 추가 단계 및 유저 데이터 상태관리 |

<br />

## 🛠️ 기술 스택

<table>
<tr>
 <td align="center">언어</td>
 <td>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=ffffff"/>
 </td>
</tr>
<tr>
 <td align="center">번들러</td>
 <td>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=FFDA44"/>
 </td>
</tr>
<tr>
 <td align="center">라이브러리</td>
 <td>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=ffffff"/>&nbsp  
  <img src="https://img.shields.io/badge/Axios-6028e0?style=for-the-badge&logo=Axios&logoColor=ffffff"/>&nbsp
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=ffffff"/>&nbsp
  <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=React-Hook-Form&logoColor=ffffff"/>&nbsp<br />
  <img src="https://img.shields.io/badge/Emotion-CC67BC?style=for-the-badge&logo=Emotion&logoColor=ffffff"/>&nbsp
  <img src="https://img.shields.io/badge/Chakra-319795?style=for-the-badge&logo=Chakra UI&logoColor=ffffff"/>&nbsp
  <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=Framer&logoColor=ffffff"/>&nbsp
 </td>
</tr>
<tr>
 <td align="center">상태관리</td>
 <td>
  <img src="https://img.shields.io/badge/Recoil-1678e0?style=for-the-badge&logo=Recoil&logoColor=ffffff"/>&nbsp  
 </td>
</tr>
<tr>
 <td align="center">패키지</td>
 <td>
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=NPM&logoColor=ffffff"/>
  </td>
</tr>
<tr>
 <td align="center">포맷터</td>
 <td>
  <img src="https://img.shields.io/badge/Prettier-373338?style=for-the-badge&logo=Prettier&logoColor=ffffff"/>&nbsp 
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=ffffff"/>&nbsp 
  <img src="https://img.shields.io/badge/Husky-006179?style=for-the-badge&logo=Husky&logoColor=ffffff"/>&nbsp 
  <img src="https://img.shields.io/badge/Lint staged-02CBF2?style=for-the-badge&logo=Lint staged&logoColor=ffffff"/>&nbsp 
 </td>
</tr>
<tr>
 <td align="center">배포</td>
 <td>
   <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=ffffff"/>
 </td>
</tr>
<tr>
 <td align="center">협업</td>
 <td>
    <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/Notion-5a5d69?style=for-the-badge&logo=Notion&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/Discord-4263f5?style=for-the-badge&logo=Discord&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/Figma-d90f42?style=for-the-badge&logo=Figma&logoColor=white"/>&nbsp  
 </td>
</tr>
<tr>
 <td align="center">IDE</td>
 <td>
    <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>&nbsp
</tr>
</table>

<br />

## 🌿 Commit Convention

| prefix | description |
| --- | --- |
| feature | 새로운 기능 추가 |
| fix | 버그 수정 |
| rename | 파일 또는 폴더명 수정, 이동
| remove | 파일 삭제
| design | UI 디자인 변경
| docs | 문서 수정 |
| style | 코드 포맷팅 |
| refactor | 코드 리팩토링 |
| chore | 빌드 업무 수정, 패키지 매니저 수정 |

<br />

## 📁 폴더 구조

```
Team-5YES-WuMo-FE 
├── public
└── src
    ├── api
    ├── components
    │   ├── base
    │   ├── main
    │   ├── navigation
    │   ├── party
    │   ├── place
    │   ├── profile
    │   ├── routeList
    │   ├── signIn
    │   └── signUp
    ├── hooks
    ├── pages
    ├── store
    ├── styles
    ├── types
    └── utils
        └── constants
```

<br />

## 📓 프로젝트 관련 문서

- ⭐️ [노션](https://backend-devcourse.notion.site/05-5YES-3f17f0d96f1e43deb4b262aa3b0fb459)
- 📝 [기획서](https://backend-devcourse.notion.site/bf79f214925444a6aa045ecf150e2a24)
- 🖼️ [기능 명세서](https://backend-devcourse.notion.site/fc61a303928a4619bc5735d8891666c6)
- 🎨 [와이어프레임/디자인](https://www.figma.com/file/akZ8Cc0FmKUjCiN3NlxjRu/Gidong?node-id=196%3A1491)
- 🎤 [발표 자료](https://drive.google.com/file/d/18Yty1R3XuJQJl6X0CjM1EmJ6AjS41vGl/view?usp=share_link)
- 🎥 [시연 영상](https://drive.google.com/file/d/1B8ObIZ6I-fEhJmHqysnaVDtppTUnUBXn/view?usp=share_link)

<br />

## 🗓️ 프로젝트 일정

- 23.02.16 - 23.02.21 프로젝트 기획 및 설계(초기 프로젝트 기획 및 설계, 프로젝트 세팅, API 명세서 작성)
- 23.02.22 - 23.02.28 MVP 기능 개발(API 명세서를 토대로 FE/BE MVP 기능 개발)
- 23.03.01 - 23.03.07 기능 개발 및 배포(FE/BE 기능 개발, API 연결 및 배포)
- 23.03.08 - 23.03.14 QA, 버그 수정 및 리팩토링(전체적인 서비스 안정화 및 문서화)
- 23.03.15 - 리팩터링 및 UI/UX와 기능 개선
