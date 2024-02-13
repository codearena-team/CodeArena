# 🖥 2학기 프로젝트 - CodeArena

## 목차

1. 서비스 소개<br>
2. 개발기간
3. 팀원 구성 및 역할<br>
4. 기술 스택<br>
5. 시스템 아키텍처<br>
6. 주요기능

## 서비스 소개

### 코딩이 선택이 아닌 필수가 되어가는 단계에서

### 프로그래머로서 취업하기 위한 첫 발판인 코딩테스트를 즐겁게!

코딩테스트가 대부분의 프로그래머에게 가장 신경쓰이고 힘든 요소 중 하나입니다.

이런 코딩테스트 학습의 경우, 혼자서 충분한 시간을 갖고 공부하는것도 중요하지만

"내가 이제 어느정도 실력일까?" 혹은 "혼자 하니까 따분해" 라는 생각이 들 수 있습니다.

코드아레나는 기본적인 다른 온라인 저지 사이트에서의 장점들을 모으고

코드아레나만의 특색인 레이팅 매칭 시스템을 추가함으로서 재미있는 학습을 할 수 있도록 장려합니다.


## 개발기간

|  | [프로젝트 일정] |
| :---:|:---:|
|진행 기간|2024.01.-2024.02.16|
|인원|6명|
|시간|평일 09:00-18:00|

## 🤖 팀원 구성 및 역할

<table>
 <tr>
    <td align="center"><a href="https://github.com/kimhaechang1"><img src="https://avatars.githubusercontent.com/kimhaechang1" width="130px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/Be-HinD"><img src="https://avatars.githubusercontent.com/Be-HinD" width="130px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/Agwii"><img src="https://avatars.githubusercontent.com/Agwii" width="130px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/wkdtpwjd19"><img src="https://avatars.githubusercontent.com/wkdtpwjd19" width="130px;" alt=""></a></td>
   <td align="center"><a href="https://github.com/timber3"><img src="https://avatars.githubusercontent.com/timber3" width="130px;" alt=""></a></td>
   <td align="center"><a href="https://github.com/YangGeoun"><img src="https://avatars.githubusercontent.com/YangGeoun" width="130px;" alt=""></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Be-kimhaechang1"><b>김회창</b></a><p><b>팀장</b><p><b>Back-end</b></p><p>매칭서버 개발</p><p>Problem Solving API 개발</p><p>인프라 구축</p></p></td>
    <td align="center"><a href="https://github.com/Be-HinD"><b>김정현</b></a><p><b>팀원</b></p><p><b>Back-end</b></p><p>아레나 게임서버 개발</p><p>알림 & 게시판 API 개발</p><p>화면공유 시스템 관리</p></p></td>
    <td align="center"><a href="https://github.com/Agwii"><b>이귀현</b></a><p><b>팀원</b></p><p><b>Front-end</b></p><p>아레나 컴포넌트 개발</p></td>
    <td align="center"><a href="https://github.com/wkdtpwjd19"><b>장세정</b></a><p><b>팀원</b></p><p><b>Front-end</b></p><p>알림 & 게시판 컴포넌트 개발</p><p>회원 컴포넌트 개발</p></td>
    <td align="center"><a href="https://github.com/timber3"><b>오승현</b></a><p><b>팀원</b></p><p><b>Back-end</b></p><p>채점서버 개발</p><p>회원관리 API 개발</p></p></td>
    <td align="center"><a href="https://github.com/YangGeoun"><b>양건우</b></a><p><b>팀원</b></p><p><b>Front-end</b></p><p>Problem Solving 컴포넌트 개발</p><p>화면 공유 컴포넌트 개발</p></p></td>
  </tr>
</table>

<br/>

## 📌 커밋 컨벤션

<h3> Type 명세 </h3>
<table>
  <tr>
<td><p><b>[feat]</p> : 기능 개발 완료</p></td>
<td><p><b>[modify]</p> : 기능 개발 중 수정 사항 발생</p></td>
<td><p><b>[refactor]</p> : 리팩토링 수행</p></td>
<td><p><b>[docs]</p> : 문서 작업</p></td>
<td><p><b>[test]</p> : 테스트 코드 작성</p></td>
<td><p><b>[design]</p> : CSS, UI 수정</p></td>
<td><p><b>[remove]</p> : 파일 삭제</p></td>
  </tr>
</table>
<hr>
<h3> Commit Example </h3>
<p>feat 커밋 예시 (JIRA 고유번호 4번 Task의 경우) </p>
<p>[Type] Subject //타입의 경우 첫글자는 대문자로 작성, 커밋 내용이 뚜렷하게 드러날 수 있도록 작성 </p>
<p>body //Subject 관련 어떤 작업을 했는지에 대해 간단하게 작성 </p>
<p>footer //JIRA Task 번호와 매칭 </p>
<table>
  <tr>
<td><p><b>[Feat] 로그인 기능 구현</b></p>

<p><b>로그인 API 구현 </b></p>

<p><b>Related to : D211-4 </b></p></td>
  </tr>
</table>



## 기술 스택

### 시스템 구조도

![소프트웨어_아키텍쳐.drawio](/uploads/640c3b65415a4a2db582b3e8ec5aa778/소프트웨어_아키텍쳐.drawio.png)


## 📌 브랜치 전략
### Github-Flow 전략 채택
<p>- CI/CD 환경에서 개발 진행. </p>
<p>- master 및 feature 브랜치 활용 </p>
