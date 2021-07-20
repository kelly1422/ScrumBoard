# SCRUM BOARD 

오프라인으로 진행되는 스크럼을 온라인으로도 진행할 수 있도록 도와주는 웹페이지 

게시글을 등록하고 사진을 올리고 몰입캠프의 일정을 캘린더에서 볼 수 있음

> 강수아, 김영경, 김장현 
> 
> React, NodeJS, MongoDB

## LOGIN & SIGN UP

> 이메일과 비밀번호로 로그인 진행 

<img src="https://user-images.githubusercontent.com/63537847/126374601-d16b7aa6-ee94-40f0-8b1c-65dc17641fc0.png" width="400" height="200"> 

- 이메일 형식이 아니면 다시 입력하라는 알림창이 뜨고 중복되는 이메일이 가입되는 것 또한 방지할 수 있음 
- 비밀번호는 8자 이상이고 숫자, 문자, 특수문자를 포함해야함
- crypto를 사용해서 보안을 강화함 
- 5회 이상 비밀번호가 틀리면 고객센터에 연락하라는 알림창이 뜸


## Scrum Board

> 각각의 사용자가 본인의 프로젝트 내용을 게시판에 올림 
> 
> 글에 댓글을 달 수 있고 내가 쓴 글을 모아볼 수 있음

- ### List 
  <img src="https://user-images.githubusercontent.com/63537847/126374975-8fbdd8de-e70e-4376-bfe1-3c94f377754a.png" width="400" height="200"> <img src="https://user-images.githubusercontent.com/63537847/126376608-277d6291-0524-405f-b670-c4803825f5d2.png" width="400" height="200">
  
  - 글은 작성할 순서대로 나열됨
  - 작성한 날짜, 제목, 글쓴이가 보임 
  - 글을 작성한 사람의 이름을 클릭하면 그 사람이 쓴 글을 모아서 볼 수 있음 

- ### New Post
  <img src="https://user-images.githubusercontent.com/63537847/126375883-bce9a553-8ce2-4b0f-b8a4-385e11becb85.png" width="400" height="200"> 
  
  - 상단바에 있는 버튼을 클릭하면 새 글을 쓸 수 있는 페이지로 넘어감
  - CKEditor를 사용하여 사진, 표 등을 직접 쓸 수 있음 
  - 저장하면 바로 List에 새로 뜨는 것을 볼 수 있음

- ### Post Detail
  <img src="https://user-images.githubusercontent.com/63537847/126375983-78cbb941-f07d-416b-896a-119aed2f3a86.png" width="400" height="200"> <img src="https://user-images.githubusercontent.com/63537847/126376071-9a267869-bc36-4748-89b6-f8632311be67.png" width="400" height="200"> 
  
  - list에 있는 글을 클릭하면 상세 페이지로 넘어감
  - 해당 글에 익명으로 댓글을 달 수 있음 
  - 수정 버튼을 클릭하면 글의 내용이나 제목을 바꿀 수 있음
  - 삭제 버튼을 클릭하면 글의 내용이 db에서 지워지고 리스트로 넘어가면 삭제된 것을 볼 수 있음 
  
- ### My Page 
  <img src="https://user-images.githubusercontent.com/63537847/126376406-e5db2f0b-49b2-40ac-9764-7503fb6b26e5.png" width="400" height="200">
  
  - 내가 작성한 글들을 모아서 볼 수 있음
  - 나의 팀의 스크럼 진행 상황을 한 번에 볼 수 있음 


## Calendar 

> 미리 db에 저장한 스케줄을 볼 수 있음 
> 현재, 전 달, 다음 달 모두 볼 수 있고 monthly, weekly, agenda를 선택하여 다양하게 볼 수 있음 

<img src="https://user-images.githubusercontent.com/63537847/126376672-8ce9623d-fe1a-4e17-8844-5af9071443d7.png" width="400" height="200"> <img src="https://user-images.githubusercontent.com/63537847/126376847-a86eb3af-a281-4a3d-a682-2765681849e0.png" width="400" height="200"> 

- npm에서 react-calendar library 불러와서 캘린더 페이지 생성 

## Album 

<img src="" width="400" height="200">

- 로컬에 있는 사진을 불러와 저장할 수 있음
- 화면에 그리드 뷰 형태로 사진들이 나타남
