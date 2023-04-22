# 환경
* nodeJS : 18.15.11
* nestJS : 9.0.0
* typeorm : 0.3.14
* mysql : 3.2.0

# URL

| url               | method | 기능            |
|-------------------|--------|---------------|
| auth/signUp       | Post   | 회원가입          |
| auth/signIn       | Post   | 로그인           |
| boards/           | GET    | 전체 게시글목록 조회   |
| boards/           | Post   | 게시글 작성        |
| boards/:uuid        | Get    | 게시글 상세조회      |
| boards/:id        | Delete | 게시글 삭제        |
| boards/:id/update | Patch  | 게시글 내용 수정     |
| boards/:id/status | Patch  | 게시글 공개/비공개 수정 |
| boards/:id/reply  | Post   | 댓글 작성         |


