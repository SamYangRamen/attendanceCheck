## 환경설정



### Linux에 MariaDB 설치하는 과정

1. 설치

   - `sudo apt-get instrall mariadb-server`

2. 비밀번호 설정 (https://m.blog.naver.com/6116949/221992559683)

   1. `sudo mysql`

   2. 아래 둘 중 하나를 적용

      ```
      update user set plugin='' where User='root';
      set password = password('777777');
      flush privileges;
      ```

      ```
      set password for 'root'@'localhost' = password('777777');
      ```

3. DB 편집기

   - DBeaver 21.2.4 (https://dbeaver.io/download/)

4. Linux OS에 MariaDB를 설치했을 때 기본적으로 설정되는 URL

   - `jdbc:mysql://localhost:3306/`
