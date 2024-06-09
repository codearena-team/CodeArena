# 🖥 SSAFY 2학기 공통 프로젝트 - CodeArena

## 🎥 시연영상

### >> https://codearena.shop/ <<

## 🪪 개요

### 코딩이 선택이 아닌 필수가 되어가는 단계에서

### 프로그래머로서 취업하기 위한 첫 발판인 코딩테스트를 즐겁게!

코딩테스트가 대부분의 프로그래머에게 가장 신경쓰이고 힘든 요소 중 하나입니다.

이런 코딩테스트 학습의 경우, 혼자서 충분한 시간을 갖고 공부하는것도 중요하지만

"내가 이제 어느정도 실력일까?" 혹은 "혼자 하니까 따분해" 라는 생각이 들 수 있습니다.

코드아레나는 기본적인 다른 온라인 저지 사이트에서의 장점들을 모으고

코드아레나만의 특색인 레이팅 매칭 시스템을 추가함으로서 재미있는 학습을 할 수 있도록 장려합니다.

## 🚩 개발기간

|           |     [프로젝트 일정]     |
| :-------: | :---------------------: |
| 진행 기간 | 2024.01.03 - 2024.02.16 |
|   인원    |           6명           |

## 🤓 팀원 구성 🤓

<table>
 <tr>
    <td align="center"><a href="https://github.com/kimhaechang1"><img src="https://avatars.githubusercontent.com/kimhaechang1" width="130px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/Be-HinD"><img src="https://avatars.githubusercontent.com/Be-HinD" width="130px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/Agwii"><img src="https://avatars.githubusercontent.com/Agwii" width="130px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/wkdtpwjd"><img src="https://avatars.githubusercontent.com/wkdtpwjd" width="130px;" alt=""></a></td>
   <td align="center"><a href="https://github.com/timber3"><img src="https://avatars.githubusercontent.com/timber3" width="130px;" alt=""></a></td>
   <td align="center"><a href="https://github.com/YangGeoun"><img src="https://avatars.githubusercontent.com/YangGeoun" width="130px;" alt=""></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Be-kimhaechang1"><b>김회창</b></a><p><b>팀장</b><p><b>Back-end</b></p><p>매칭서버 개발</p><p>Problem Solving API 개발</p><p>인프라 구축</p></p></td>
    <td align="center"><a href="https://github.com/Be-HinD"><b>김정현</b></a><p><b>팀원</b></p><p><b>Back-end</b></p><p>아레나 게임서버 개발</p><p>알림 & 게시판 API 개발</p><p>화면공유 시스템 관리</p></p></td>
    <td align="center"><a href="https://github.com/Agwii"><b>이귀현</b></a><p><b>팀원</b></p><p><b>Front-end</b></p><p>아레나 컴포넌트 개발</p></td>
    <td align="center"><a href="https://github.com/wkdtpwjd"><b>장세정</b></a><p><b>팀원</b></p><p><b>Front-end</b></p><p>알림 & 게시판 컴포넌트 개발</p><p>회원 컴포넌트 개발</p></td>
    <td align="center"><a href="https://github.com/timber3"><b>오승현</b></a><p><b>팀원</b></p><p><b>Back-end</b></p><p>채점서버 개발</p><p>회원관리 API 개발</p></p></td>
    <td align="center"><a href="https://github.com/YangGeoun"><b>양건우</b></a><p><b>팀원</b></p><p><b>Front-end</b></p><p>Problem Solving 컴포넌트 개발</p><p>화면 공유 컴포넌트 개발</p></p></td>
  </tr>
</table>

<br/>

## 📌 커밋 컨벤션

```
[Feat]     : 기능 개발
[Modify]   : 코드 수정
[fix]      : 긴급 수정
[Docs]     : 문서 작업
[Test]     : 테스트 코드
[Design]   : CSS, UI 수정
[Remove]   : 파일 삭제
[Refactor] : 리팩토링
```

## 📌 코드 컨벤션

```
Back-End
- 함수명을 작성할 때는 동사+명사 형태로 구성
- 함수명은 Camel-Case로 작성
- Package Depth == 3Depth
- servlet.context-path는 해당 WAS를 나타낼 수 있도록 작성
- Endpoint는 해당 리소스를 나타낼 수 있도록 작성
- 한줄 주석은 //, 여러 줄 주석은 /** */으로 작성
```

## 📃 개발 환경

### ⚒️ Back-End

- Springboot 3.2.2
- InteliJ
- JDK 17
- AWS EC2
- AWS S3
- MySQL
- Redis
- WebSocket&STOMP
- Nginx
- OpenVidu

### ⚒️ Front-End

- React
- Visual Studio
- TailwindCSS
- OpenVidu

### ⚒️ CI/CD

- Jenkins

### ⚒️ 협업 툴

- Gerrit
- GitLab

## 📝 API 명세서

### 노션 링크 첨부 🔗

https://efficient-liver-208.notion.site/API-a1db160026a44efa971c6dc31fa2a88a

## ⚙️ ERD 다이어그램

### ERD Cloud 사이트로 제작 및 링크 첨부 🔗

https://www.erdcloud.com/d/nrfqSDdChRWJpanzz

## 📌 브랜치 전략

### Git-Flow 전략 및 Github-Flow을 기반으로 한 커스텀 전략 채택

- 사용 브랜치

  - feature : 기능개발
  - fix : 긴급 수정
  - develop : CI/CD Hook 브랜치

- Gerrit 사용 전략

  - feature 브랜치에서 기능구현이 완료되면 원격 EC2 Gerrit으로 HEAD:refs/for/[브랜치명]으로 Commit&Push로 리뷰 Open
  - 1차적으로 마니또 리뷰어가 코드리뷰 진행 및 Submit
  - 마니또의 일정이 바쁘다면 같은 포지션 동료가 코드리뷰 진행
  - 리뷰 승인 이후 develop으로 merge 후 CI/CD 배포

- 브랜치 명명 규칙
  - feature/기능 명시-{BE or FE}
    - FE Example : feature/login-FE
    - BE Example : fix/login-BE

## ⚙ 서비스 아키텍쳐

![Architecture](/asset/img/Architecture.png)

<br>
<br>

## 💻 주요 기능 소개


### 메인 화면

- 코드아레나를 대표하는 메인 페이지입니다.
- 메인페이지에서 다양한 페이지로 접근할 수 있습니다.
- 코드아레나에 대해 소개하고, 최신 문제와 인기 질문을 소개합니다.

![Main](/asset/gif/mainpage.gif)


### 회원가입

- 이메일을 통한 회원가입을 진행합니다.

![Main](/asset/gif/signup.gif)


### 로그인

- 쉽고 간편한 로그인을 진행합니다.

![Main](/asset/gif/login.gif)


### 문제 풀이 페이지

- 온라인 저지 사이트와 같이 스스로 문제 해결 능력을 기를 수 있도록 장려합니다.

![Main](/asset/gif/goProblem.gif)


### 문제 풀기

- 알고리즘 문제를 풀었다면 제출 후, 제출 현황을 확인할 수 있습니다.
- 만약 문제를 틀렸다면, 어떤 테스트 케이스에서 틀렸는지 확인할 수 있습니다.
- 문제에 대한 질문게시판과 문제 수정 요청을 제공합니다.

![Main](/asset/gif/solvingProblem.gif)
  

### 문제 카테고리

- 다양한 알고리즘 문제를 카테고리별로 제공합니다.

![Main](/asset/gif/problemCategory.gif)


### 문제 생성

- 알고리즘 문제 해결을 위한 새로운 문제를 생성합니다.
- 문제의 내용부터 입출력 예제를 입력하고, 컴파일을 시도한 후에 제출할 수 있습니다.
- 사이트 관리자측에서 문제를 검수하고 새로운 알고리즘 문제에 대해 업로드합니다.

![Main](/asset/gif/createProblem.gif)


### 마이 페이지

- 간편한 회원 정보 수정을 제공합니다.
- 자신의 푼 문제와 레이팅 점수 등을 확인할 수 있습니다.

![Main](/asset/gif/profile.gif)


### 커뮤니티 게시판

- 어려운 문제에 대해 이야기를 나눌 수 있는 커뮤니티를 제공합니다.

![Main](/asset/gif/community.gif)


- 누구나 자유롭게 질문 글을 작성할 수 있습니다.

![Main](/asset/gif/question.gif)


### 아레나 메인페이지

- 아레나를 즐길 수 있는 페이지로 이동합니다.
- 경쟁을 매칭하거나, 방을 찾아 다른 사람의 게임을 관전할 수 있습니다.
- 인기 Hot Match 방을 소개합니다.
- 각 모드별 랭킹을 제공하고, 본인의 전적을 확인할 수 있습니다.

![Main](/asset/gif/arenaMain.gif)


### 아레나 메칭 시스템

- 비슷한 Rating 점수를 가진 플레이어끼리 랜덤 매칭을 실시합니다.
- 유저는 원하는 언어, 모드를 선택하고 수락을 누르면 게임 방이 생성되어 이동합니다.

![Main](/asset/gif/arena_match.gif)


### 아레나 스피드전 모드

- 아레나 스피드전 모드를 제공합니다.
- 먼저 제출해서 맞추는 사람이 승리하는 방식입니다.
- 시간이 모두 소요될 때까지 정답자가 나오지않는다면 무승부로 처리됩니다.

![Main](/asset/gif/speed.gif)


### 아레나 효율전 모드

- 아레나 효율전 모드를 제공합니다.
- 먼저 제출해서 맞추는 사람이 승리하는 방식과는 달리
- 제출한 코드 중 메모리와 시간이 가장 효율적인 코드를 제출한 사람이 승리합니다.
- 중간 채점 현황을 확인할 수 있도록 제공합니다.

![Main](/asset/gif/eff.gif)

![Main](/asset/gif/eff_ans.gif)


### 아레나 게임 관전

- 아레나 게임을 플레이하고있는 방을 관전할 수 있습니다.
- 플레이어의 화면 공유를 통하여 코딩 작성을 확인할 수 있습니다.
- 관전자들의 자유로운 소통을 위한 채팅을 제공합니다.

![Main](/asset/gif/observe.gif)


### 아레나 게임 배팅

- 다른 플레이어들의 코딩 배틀을 관전하면서 포인트를 배팅할 수 있습니다.
- 자기가 건 플레이어가 승리한다면 포인트를 더욱 얻을 수 있습니다.
- 포인트 비율 참고 : 배팅 후 금액 + (배팅 금액 * (우승한 유저의 점수 + 1))

![Main](/asset/gif/batting.gif)