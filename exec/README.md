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

#### Docker, Docker-compose 설치

Docker 설치
```
sudo yum install docker -y
```
docker login 하기 (docker hub계정으로다가)
```
docker login
```
docker 백그라운드 실행하기
```
sudo systemctl status docker
sudo systemctl start docker
sudo systemctl enable docker
```
위의 명령 도중 docker.sock permission denied 일때
```
sudo usermod -aG docker $USER
```
만약 위의 방법이 안된다면 아래의 방법을 사용하되, 위험합니다
```
sudo chmod 666 /var/run/docker.sock
```

Docker-componse 설치
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

OpenVidu 설치
```
curl <https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_2.25.0.sh> | bash
```

환경설정 열기 (익숙한 편집기로 / 안보이시면 openvidu 폴더로 이동 후)
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
OpenVidu 한번 실행
```
./openvidu start
```
OpenVidu 종료
```
./openvidu stop
```

OpenVidu에 설정한 도메인을 기반으로 접속 확인

.env 파일 열고, HTTP_PORT & HTTS_PORT 설정
```
vim .env
```

```
HTTP_PORT=8084
HTTP_PORT=8443
```
OPENVIDU 다시 실행
```
./openvidu start
```

#### 

