# 포팅 메뉴얼

### 주요 기술 및 버전명시

- 아마존 EC2
  - OS : Ubuntu 20.04.6 LTS
  - Nginx : 1.18.0 (Ubuntu)
  - Docker : 25.0.1

- 아마존 S3

- Front
  - Node js : version 20
  - React js : 18.2.0
  - Openvidu-browser : 2.29.1
  - React-redux : 8.1.3
  - Nginx : 1.24.0

- Server
  - WAS : Spring-boot 3.2.2
  - OpenVidu : 2.25.0
  - kurento-media-server : 6.18.0
  - Java : jdk-17

- Storage 
  - MySQL : 8.3.0
  - Redis : 7.2.4

## 설치 및 빌드

기본적으로 **램 16기가 이상의 환경**에서 실행하는걸 권장합니다.

또한 ```OpenVidu```나 ```Nginx```같은 경우, **꼭 순서에 맞춰서 설치**하시기 바랍니다.


### 1. 준비물 준비

#### 아마존 EC2 포트열기

현재 열려있는 포트번호 확인
```
sudo ufw allow
```
포트번호 열기
```
sudo ufw allow <PORT번호> 
```
아래의 포트번호 열기
```
8081 : codearena REST 서버 포트
8082 : 게임 & 채팅서버 포트
8083 : 매칭서버 포트
8085 : JAVA 채점서버 포트
8086 : C++ 채점서버 포트
8087 : PYTHON 채점서버 포트
3001 : FRONT 서버 포트
3211 : MYSQL 서버 포트
8443, 8084 : OPENVIDU 포트
6379 : Redis 포트
```

#### ```Docker```, ```Docker-compose``` 설치

```Docker``` 설치
```
sudo yum install docker -y
```
docker login 하기 (docker hub계정으로다가)
```
docker login
```
```Docker``` 백그라운드 실행하기
```
sudo systemctl status docker
sudo systemctl start docker
sudo systemctl enable docker
```
위의 명령 도중 ```docker.sock``` permission denied 일때
```
sudo usermod -aG docker $USER
```
만약 위의 방법이 안된다면 아래의 방법을 사용하되, 위험합니다
```
sudo chmod 666 /var/run/docker.sock
```

```Docker-componse``` 설치
```
sudo yum install docker-compose-plugin
```
Docker-compose 설치확인
```
docker compose version
```
#### SSL을 위한 ```letencrypt``` 설정

```sh
sudo apt-get install letencrypt
```

```sh
sudo letencrypt certonly --standalone -d <도메인>
```

#### ```OpenVidu``` 설치

관리자 권한 접속하기 (sudo not found 뜬다면 su 만 입력)
```
sudo su
```

/opt 로 이동
```
cd opt
```

```OpenVidu``` 설치
```
curl <https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_2.25.0.sh> | bash
```

환경설정 열기 (익숙한 편집기로 / 안보이시면 ```OpenVidu``` 폴더로 이동 후)
```
vim .env
```

내부에 있는 내용 중, 아래의 부분을 맞게 작성
```
DOMAIN_OR_PUBLIC_IP=<도메인>

OPENVIDU_SECRET=설정할 비밀번호를 넣어 주세요

CERTIFICATE_TYPE=letsencrypt

LETSENCRYPT_EMAIL=이메일을 입력해주세요
```
```OpenVidu``` 한번 실행
```
./openvidu start
```
```OpenVidu``` 종료
```
./openvidu stop
```

```OpenVidu```에 설정한 도메인을 기반으로 접속 확인

.env 파일 열고, HTTP_PORT & HTTS_PORT 설정
```
vim .env
```

```
HTTP_PORT=8084
HTTP_PORT=8443
```
```OpenVidu``` 다시 실행
```
./openvidu start
```

#### ```NGINX``` 설치

아마존 EC2 설치
```
sudo apt-get install nginx
```
설치 확인
```
sudo nginx -v
```
```NGINX``` 중지
```
sudo systemctl stop nginx
```

```NGINX``` CONFIG 파일 작성

```
cd /etc/nginx/sites-available
```
```
sudo vim deploy-test.conf
```
아래의 내용을 붙여넣기
```
server {

        location / {
                proxy_pass http://localhost:3001;
        }

        location /api {
                proxy_pass http://localhost:8081;
        }
        location /game/ {
                proxy_pass http://localhost:8082;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "Upgrade";
                proxy_set_header Host $host;
        }
        location /matching {
                proxy_pass http://localhost:8083;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "Upgrade";
                proxy_set_header Host $host;
        }
        location /java {
                proxy_pass http://localhost:8085;
        }
        location /cpp {
                proxy_pass http://localhost:8086;
        }
        location /python{
                proxy_pass http://localhost:8087;
        }
        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/<도메인>/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/<도메인>/privkey.pem;
}
server {

        if ($host = <도메인>) {
                return 301 https://$host$request_uri;
        }

        listen 80;
        server_name <도메인>;

        return 404;
}

```

```sites-enabled```로 방금 작성한 파일 복사

복사하기전 꼭 ```sites-enabled```에 ```deploy-test.conf```가 없는 상태여야 합니다.

```
cp /etc/sites-available/deploy-test.conf /etc/sites-enabled/deploy-test.conf
```

```NGINX``` 재시작
```
sudo systemctl restart nginx
```

#### 클론받기

아래의 링크를 ```git clone``` 명령어를 통해 아마존 EC2에서 클론받아야 합니다.

```
https://lab.ssafy.com/s10-webmobile2-sub2/S10P12D211.git
```

#### ```MySQL``` 설치

도커를 이용하여 ```MySQL``` 이미지를 다운받습니다.
```
docker pull mysql
```

다운받은 ```MySQL``` 이미지를 도커 명령어로 실행합니다.
```
docker run -d -p 3211:3306 -e MYSQL_ROOT_PASSWORD=<password> --name <컨테이너명> mysql
```

잘 실행되었는지 해당 컨테이너 bash 접속후 mysql에 접근합니다.
```
docker exec -it --user root mysql bash
```
아래의 명령어로 mysql에 ```<password>```를 입력하여 접속합니다.
```
mysql -u root -p
```
정상적으로 접속되었다면 EC2가 아닌 MySQL이 설치된 환경에서 ```WorkBench```를 통해 접속합니다.

접속에 성공하였다면 ```S10P12D211/back-end/exec``` 폴더 속 ```sql```파일을 Data Import 기능을 통해 실행합니다.

#### ```Redis``` 설치하기

EC2환경에서 도커를 이용하여 Redis를 설치합니다.

Redis 이미지를 다운받습니다.
```
docker pull redis
```
도커를 통해 다운받은 이미지를 실행합니다.
```
docker run -d -p 6379:6379 --name redis redis --requirepass "<password>"
```
해당 컨테이너로 이동하여 redis-cli에 접근이 되는지 검사합니다.
```
docker exec -it redis redis-cli -a  <password>
```

### 2. ```application.properties``` 설정

프로젝트의 주요 부분들은 ```Jasypt```를 통한 암호화가 진행되어 있기에

Jasypt로 암호화된 부분들이 실제로 실행될 때 복호화 될 수 있어야 합니다.

따라서 **복호화에 사용될 Key**를 하나 정하시고 아래의 사이트에 접속하셔서

암호화를 진행후, 해당 암호화된 값을 서버별로 **알맞게** 기입합니다.

Jasypt 복호화 사이트
```
https://www.devglan.com/online-tools/jasypt-online-encryption-decryption
```

기입하는 방법
```
key=ENC(<암호화된 값>)
```

그리고 **꼭 ENC() << 까먹으면 실행 안됩니다!!!**

```jwt.salt``` 의 경우 **어떤 ```application.properties```든 동일한 값으로 암호화 해야 합니다!!!**

#### REST 서버 설정

```application.properties```에 접근
```
cd /S10P12D211/back-end/codearena/src/main/resources
```

아래의 요소들을 자신의 설정에 맞게 기입 후 Jasypt 암호화 진행

```
spring.datasource.hikari.jdbc-url=jdbc:mysql://<도메인>:3211/code_arena?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8

spring.datasource.hikari.username=본인 mysql username
spring.datasource.hikari.password=본인 mysql password

spring.mail.username=이메일 인증시 받아 올 네이버 메일
spring.mail.password=해당 네이버 이메일 비밀번호

judge.java.url=https://<도메인>/java
judge.cpp.url=https://<도메인>/cpp
judge.python.url=https://<도메인>/python

jwt.salt=JWT 시그니처에 사용될 문자열

cloud.aws.credentials.accessKey=본인 aws AccessKey
cloud.aws.credentials.secretKey=본인 aws secretKey

cloud.aws.s3.bucket=본인 aws s3 버킷명
```
#### GAME 서버 설정

```application.properties```에 접근
```
cd /S10P12D211/back-end/Chatting/src/main/resources
```

아래의 요소들을 자신의 설정에 맞게 기입 후 Jasypt 암호화 진행

```
spring.datasource.hikari.jdbc-url=jdbc:mysql://<도메인>:3211/code_arena?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8

spring.datasource.hikari.username=본인 mysql username
spring.datasource.hikari.password=본인 mysql password

OPENVIDU_URL=https://<도메인>:8443/
OPENVIDU_SECRET=</opt/openvidu/.env에서 설정한 SECRET값>

judge.java.url=https://<도메인>/java
judge.cpp.url=https://<도메인>/cpp
judge.python.url=https://<도메인>/python

jwt.salt=JWT 시그니처에 사용될 문자열

judge.java.url=https://<도메인>/java
judge.cpp.url=https://<도메인>/cpp
judge.python.url=https://<도메인>/python

rest.url=https://<도메인>/api
```
#### Match 서버 설정

```application.properties```에 접근
```
cd /S10P12D211/back-end/match/src/main/resources
```

아래의 요소들을 자신의 설정에 맞게 기입 후 Jasypt 암호화 진행

```
redis.port=6379
redis.host=<도메인>
redis.password=<requirepass 로 설정했던 비밀번호>

gameserver.url=https://<도메인>/game
restserver.url=https://<도메인>/rest
```
#### 채점서버 설정

```application.properties```에 접근

Python 서버 경로
```
cd /S10P12D211/back-end/judge_python/src/main/resources
```

Java 서버 경로
```
cd /S10P12D211/back-end/judge_java/src/main/resources
```

C++ 서버 경로
```
cd /S10P12D211/back-end/judge_cpp/src/main/resources
```

아래의 요소들을 자신의 설정에 맞게 기입 후 Jasypt 암호화 진행

```
spring.datasource.hikari.jdbc-url=jdbc:mysql://<도메인>:3211/code_arena?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8

spring.datasource.hikari.username=본인 mysql username
spring.datasource.hikari.password=본인 mysql password
```

### 3. 서버 빌드 후 실행

각 서버를 설치해둔 Docker명령을 통해 빌드해야 합니다.

빌드를 해야하는 서버의 목록은 아래와 같습니다.
```
S10P12D211/back-end/Chatting : 게임서버
S10P12D211/back-end/codearena : 코드아레나 REST 서버
S10P12D211/back-end/judge_cpp : C++채점 서버
S10P12D211/back-end/judge_java : Java 채점 서버
S10P12D211/back-end/judge_python : Python 채점 서버
S10P12D211/back-end/match : matching 서버
S10P12D211/front-end : 프론트 서버
```

#### 프론트 서버 빌드하기

해당 디렉토리로 이동
```
cd /S10P12D211/front-end
```
프론트 서버 빌드
```
docker build --no-cache=true -t react-app .
```
프론트 서버 실행
```
docker run -d -p 3001:80 --name react-app react-app:latest
```
프론트 서버가 컨테이너 위에서 실행되고 있는지 확인
```
docker ps -a
```
혹은 아래 주소 접속시 프론트페이지가 로드 되어야 합니다.
```
https://<도메인>/
```

#### 백엔드 서버 빌드하기

모든 프로젝트 공통으로 사용하는 명령어는 같습니다.

각 서버 폴더로 들어가면 ```Dockerfile``` 이란 도커 빌드 명령어를 모아두는 파일이 있습니다.

이 파일이 보이는 경로에서 아래의 명령어를 실행합니다.

Java Gradle 빌드
```
./gradlew clean build
```
위의 명령어가 permission denied 당했다면, 아래 명령어를 실행 후 실행
```
chmod +x gradlew
```

도커 빌드
```
docker build --no-cache=true -t <서버폴더명> .
```

도커 실행
```
REST 서버 : docker run -d -p 8081:8080 --name codearena -e ENV_KEY=<Jasypt키> codearena:latest

게임서버 : docker run -d -p 8082:8080 --name gameserver -e ENV_KEY=<Jasypt키> gameserver:latest

매칭서버 : docker run -d -p 8083:8080 --name match -e ENV_KEY=<Jasypt키> match:latest

Java 채점서버 : docker run -d -p 8085:8080 --name judgejava -e ENV_KEY=<Jasypt키> judgejava:latest

C++ 채점서버 : docker run -d -p 8086:8080 --name judgecpp -e ENV_KEY=<Jasypt키> judgecpp:latest

Python 채점서버 : docker run -d -p 8087:8080 --name judgepython -e ENV_KEY=<Jasypt키> judgepython:latest
```