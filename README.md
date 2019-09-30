# nodejs-mysql-jwt을 활용한 인터넷뱅킹 이용 현황 정보 제공 API 개발

sample data : [서울시 인터넷뱅킹 이용률 및 이용기기 통계](http://data.seoul.go.kr/dataList/datasetView.do?infId=10909&srvType=S&serviceKind=2&c%20urrentPageNo=1)

# 개발 프레임워크

nodejs express 웹 프레임워크

# 문제해결 전략

- 샘플csv파일을 로드해서 DB에 저장하기 위한 데이타셋을 반환하는 함수를 작성한다.

- 디바이스 아이디는 uuidv4를 포맷을 이용해서 중복되지 않게 만든다.

- device_id와 device_name만 존재하는 데이터 셋이 따로 존재하므로 데이타는 device_id를 이용하여 저장한다.

- yearusages의 device_id는 외래키로 devices의 기본키인 device_id를 참조한다.

- jwt를 활용하기 위한 유저 생성 과정중 생성되는 password는 bcrypt를 이용하여 안전하게 저장한다.

- jwt의 알고리즘은 HMACSHA256()을 사용한다. 만료시간 테스트를 위해 테스트시 토큰 만료시간은 3초 일반의 경우는 300초로 정의한다.

- 원활한 프로그램 시작을 위해 db로 heroku 서버(clearDB MySQL)를 띄워놓았다.

# 어플리케이션 실행

1. nodejs 설치

`brew install nodejs`

2. mysql 설치 (test의 잦은 읽기 쓰기를 위해 localhost의 mysql을 사용합니다. test를 제외한 재현은 heroku로 띄워놓은 db를 보기때문에 설치 안하시고 사용가능합니다.)

`brew install mysql`

3. 프로젝트 다운로드

`git clone https://github.com/kimdugong/nodejs-mysql-jwt-api.git`

`cd nodejs-mysql-jwt-api`

4. npm package 설치

`npm install`

5. nodejs application 실행

`npm start`

    Server running on port 3000
    table initializing finished!

# API

## 계정생성

### Resource URL

- `POST /api/v1/auth/signup`

### Resource Information

- format: JSON

### Parameters

id: 로그인에 필요한 id

password: 로그인에 필요한 password

### Example Requests

```
curl -X POST \
  http://localhost:3000/api/v1/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"id": "userid", "password": "password"}'
```

### Example Response

```
{
    "user": {
        "id": "userid"
    },
    "message": "user create successfully."
}
```

## 로그인 (토큰발급)

### Resource URL

- `POST /api/v1/auth/signin`

### Resource Information

- format: JSON

### Parameters

id: 로그인에 필요한 id

password: 로그인에 필요한 password

### Example Requests

```
curl -X POST \
  http://localhost:3000/api/v1/auth/signin \
  -H 'Content-Type: application/json' \
  -d '{
	"id": "userid",
	"password": "password"
}'
```

### Example Response

```
{
    "auth": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJpZCIsImlhdCI6MTU2OTg2NTE1NiwiZXhwIjoxNTY5ODY1NDU2fQ.gKWPupJoL__huoJWwqOH0WSvyBN2MePTJkHVTtd2tt4",
    "message": "sign in successfully"
}
```

## 토큰 재발급

### Resource URL

- `GET /api/v1/auth/refresh`

### Resource Information

- format: JSON

### Headers

- Authorization : Bearer <Token>

### Example Requests

```
curl -X GET \
  http://localhost:3000/api/v1/auth/refresh \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJpZCIsImlhdCI6MTU2OTg2NDc0NywiZXhwIjoxNTY5ODY1MDQ3fQ.Pd8jLWeL7NtND-Kc_alAxBiGVKAcZncXEwK_kNXQy9Y'
```

### Example Response

```
{
    "auth": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJpZCIsImlhdCI6MTU2OTg2NTI5OCwiZXhwIjoxNTY5ODY1NTk4fQ.XNdufT3C3i_noO3WBOUEsAX64mj6tuoTN6xeJAV4eC8",
    "message": "refresh token successfully"
}
```

## 인터넷뱅킹 서비스 접속 기기 목록을 출력

### Resource URL

- `GET /api/v1/devices`

### Resource Information

- format: JSON

### Headers

- x-access-token : <Token>

### Example Requests

```
curl -X GET \
  http://localhost:3000/api/v1/devices \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJpZCIsImlhdCI6MTU2OTg2NDgyNSwiZXhwIjoxNTY5ODY1MTI1fQ.yc3x_uEU5vkwTdpF4xsb3dxUNFoli-EhIeqlhR57AFI'
```

### Example Response

```
{
    "devices": [
        {
            "device_id": "34b3dd57-b7f3-431f-8732-f7165be32dad",
            "device_name": "기타"
        },
        {
            "device_id": "34decb5d-87a0-4d27-856d-d9848ea323cf",
            "device_name": "데스크탑 컴퓨터"
        },
        {
            "device_id": "382062a3-ab64-4cc3-9709-230217662b46",
            "device_name": "노트북 컴퓨터"
        },
        {
            "device_id": "a8875fb3-90cc-4607-9dd2-e9839ccfdda0",
            "device_name": "스마트폰"
        },
        {
            "device_id": "ca23662c-d4ea-4875-bcfe-a2532f648017",
            "device_name": "스마트패드"
        }
    ]
}
```

## 각 년도별로 인터넷뱅킹을 가장 많이 이용하는 접속기기를 출력

### Resource URL

- `GET /api/v1/devices/year`

### Resource Information

- format: JSON

### Headers

- x-access-token : <Token>

### Example Requests

```
curl -X GET \
  http://localhost:3000/api/v1/devices/year \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImR1Z29uZyIsImlhdCI6MTU2OTg0OTA3MiwiZXhwIjoxNTY5ODQ5MzcyfQ.k928VO9Gi0JOMyGnf9UpPKSXOSbMhYMN_tqVdBDoWVc'
```

### Example Response

```
{
    "devices": [
        {
            "year": 2011,
            "device_id": "34decb5d-87a0-4d27-856d-d9848ea323cf",
            "rate": 95.1,
            "device_name": "데스크탑 컴퓨터"
        },
        {
            "year": 2012,
            "device_id": "34decb5d-87a0-4d27-856d-d9848ea323cf",
            "rate": 93.9,
            "device_name": "데스크탑 컴퓨터"
        },
        {
            "year": 2013,
            "device_id": "34decb5d-87a0-4d27-856d-d9848ea323cf",
            "rate": 67.1,
            "device_name": "데스크탑 컴퓨터"
        },
        {
            "year": 2014,
            "device_id": "a8875fb3-90cc-4607-9dd2-e9839ccfdda0",
            "rate": 64.2,
            "device_name": "스마트폰"
        },
        {
            "year": 2015,
            "device_id": "a8875fb3-90cc-4607-9dd2-e9839ccfdda0",
            "rate": 73.2,
            "device_name": "스마트폰"
        },
        {
            "year": 2016,
            "device_id": "a8875fb3-90cc-4607-9dd2-e9839ccfdda0",
            "rate": 85.1,
            "device_name": "스마트폰"
        },
        {
            "year": 2017,
            "device_id": "a8875fb3-90cc-4607-9dd2-e9839ccfdda0",
            "rate": 90.6,
            "device_name": "스마트폰"
        },
        {
            "year": 2018,
            "device_id": "a8875fb3-90cc-4607-9dd2-e9839ccfdda0",
            "rate": 90.5,
            "device_name": "스마트폰"
        }
    ]
}
```

## 특정 년도를 입력받아 그 해에 인터넷뱅킹에 가장 많이 접속하는 기기 이름을 출력

### Resource URL

- `GET /api/v1/devices/:year`

### Resource Information

- format: JSON

### Headers

- x-access-token : <Token>

### Parameters

- year: 연도

### Example Requests

```
curl -X GET \
  'http://localhost:3000/api/v1/devices/2013?=' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJpZCIsImlhdCI6MTU2OTg2NTE1NiwiZXhwIjoxNTY5ODY1NDU2fQ.gKWPupJoL__huoJWwqOH0WSvyBN2MePTJkHVTtd2tt4'
```

### Example Response

```
{
    "devices": {
        "year": 2013,
        "rate": 67.1,
        "device_name": "데스크탑 컴퓨터"
    }
}
```

## 디바이스 아이디를 입력받아 인터넷뱅킹에 접속 비율이 가장 많은 해를 출력

### Resource URL

- `GET /api/v1/devices/year/:device_id`

### Resource Information

- format: JSON

### Headers

- x-access-token : <Token>

### Parameters

- device_id: 디바이스 아이디

### Example Requests

```
curl -X GET \
  http://localhost:3000/api/v1/devices/year/a8875fb3-90cc-4607-9dd2-e9839ccfdda0 \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJpZCIsImlhdCI6MTU2OTg2NTUyNCwiZXhwIjoxNTY5ODY1ODI0fQ.dRDD8YenuJ3U6Iyqy7nEpIKkBuWNkVAIa96Jv9oNyX0'
```

### Example Response

```
{
    "devices": {
        "year": 2017,
        "rate": 90.6,
        "device_name": "스마트폰"
    }
}
```

# Test code 실행

1. mysql server 실행

`mysql.server start`

2. mysql server 접속

`sudo mysql -p`

`Password: <컴퓨터 유저 비밀번호>`

`Enter password: <db 비밀번호>`

3. `project_root/config/config.json` 파일 수정

```
{
    "test" {
        "username": "root",
        "password": "password",
        ...
    }
}
```

부분을 자기의 환경에 맞게 수정

4. test code 실행

`npm test`

    table initializing finished!
        ✓ /api/v1/auth/signup (106ms)
        ✓ /api/v1/auth/signin (68ms)
        ✓ /api/v1/auth/refresh
        ✓ Token Exipiration Time Check.
        ✓ csv file load
        ✓ /api/v1/devices
        ✓ /api/v1/devices/year
        ✓ /api/v1/devices/:year
        ✓ /api/v1/devices/year/:device_id
    9 passing (5s)

# Database

heroku의 ClearDB MySQL 사용

```
    "username": "b7b11c9d047aa8",
    "password": "e0463f63",
    "database": "heroku_4cfefa0ef2f540f",
    "host": "us-cdbr-iron-east-02.cleardb.net",
```

## Tables

![table description](https://d.pr/i/0v6EoB+)

### yearusages

![yearusages description](https://d.pr/i/uLw18X+)

### devices

![devices description](https://d.pr/i/y1sOo1+)

### users

![users description](https://d.pr/i/UU0Fg9+)

## Dataset

### yearusages

![yearusages data set](https://d.pr/i/2hdOtt+)

### devices

![device data set](https://d.pr/i/oJv5ON+)

### users

    password 저장 알고리즘 bcrypt

![users data set](https://d.pr/i/ZjsXO4+)

# JWT

    algorithm : HS256
    expireTime: 300s
    test expireTime: 3s

![jwt](https://d.pr/i/iowkG3+)
