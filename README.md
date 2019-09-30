# nodejs-mysql-jwt을 활용한 인터넷뱅킹 이용 현황 정보 제공 API 개발

sample data : [서울시 인터넷뱅킹 이용률 및 이용기기 통계](http://data.seoul.go.kr/dataList/datasetView.do?infId=10909&srvType=S&serviceKind=2&c%20urrentPageNo=1)

# 어플리케이션 실행

1. nodejs 설치

`brew install nodejs`

2. mysql 설치 (test는 잦은 읽기 쓰기를 위해 localhost의 mysql을 사용합니다.)

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

![jwt](https://d.pr/i/iowkG3+)
