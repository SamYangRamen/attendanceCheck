# 토이 프로젝트 명세서



## 학생 명단 관리 및 출석체크 시스템



### ※ 목차

1. 서론
2. 본 시스템의 용도
3. 시스템 설명
   1. 시스템 아키텍쳐
   2. DB Table Schema
   3. UX 설계
   4. UI 설계
   5. API 설계
4. 시행착오
   1. 프론트엔드 개발
   2. 백엔드 개발

부록. 사용 시나리오



---



### 1. 서론

- 성균관대학교 내 신입생 교육 목적의 공인 단체 Freshman Guide (이하 FG)에서 내부적으로 기존에 사용하던 시스템이 사용 불가능해져서, 이를 대체하는 신규 시스템을 개발하고자 본 프로젝트를 시작하게 되었음
- FG는 학부대학 신입생의 학교생활 조기 정착과 다양한 프로그램을 지원하기 위해 설립된 학생단체로, 입학식 전 신입생 수시 OT 또는 정시 OT를 열거나 1년 동안 신입생에게 여러 가지 안내 사항을 공지하는 등의 활동을 수행함
- LC(Learning Community)란 성균관대학교 내에서 신입생들을 묶는 집단 단위임



---



### 2. 본 시스템의 용도

- FG 멤버, LC, LC 멤버(신입생)의 체계적인 관리
- 각 LC를 관리할 FG 멤버(담당자)의 배정
- LC 단위의 모임 생성 및 안내 및 해당 모임에 참석한 LC 멤버들의 출석 체크
- FG 멤버, LC 멤버, LC 출석체크 상황 등의 EXCEL 통계 자료 IMPORT 및 EXPORT



---



### 3. 시스템 설명

#### 3-1. 시스템 아키텍쳐

![image](https://user-images.githubusercontent.com/53200166/149263675-72e4cdf0-1f95-416c-aff8-fb72da3dc01d.png)

- Front-End : `React`, `Axios`, `antd`
- Back-End : `Spring Boot`, `MyBatis`, `REST API`
- DB : `MariaDB`

- 형상관리 : `git` (https://github.com/SamYangRamen/attendanceCheck)



#### 3-2. DB Table Schema

![image](https://user-images.githubusercontent.com/53200166/154897101-2080489a-bfac-461a-b25c-7a5982e4d5ee.png)

- FG_MEMBER_INFO : FG 멤버의 정보를 나타냄
  - fgMemberId(INTEGER) : FG 멤버의 학번 (ex: 2022111111)
  - generation(INTEGER) : FG 멤버의 기수 (ex: 2008년에 창단하여 1기를 배출하였으므로, 2022년 FG 가입생의 기수는 15기)
  - fgMemberName(VARCHAR(N)) : FG 멤버의 이름
  - position(VARCHAR(N)) : FG 멤버의 직위 (ex: 회장, 부회장, 총무 등)
  - state(VARCHAR(N)) : FG 멤버의 상태 (ex: 입대, 휴학, 재학, 탈퇴, 졸업 등)
  - contact(VARCHAR(N)) : FG 멤버의 전화번호 (ex: 010-0000-0000)
  - mail(VARCHAR(N)) : FG 멤버의 이메일 주소 (ex: aaa@aaa.aa)
  
- ACCOUNT_INFO : FG 멤버의 계정 정보를 나타냄. FG 멤버는 본인의 학번 또는 이메일과 패스워드를 통해 시스템에 접속하는 구조
  - fgMemberId(INTEGER) : FG 멤버의 학번
  - password(VARCHAR(N)) : FG 계정의 패스워드
  - salt(VARCHAR(N)) : 계정 보안을 위해 로그인 단계에서 패스워드 비교 시 패스워드를 해시화하기 위한 더미 데이터
  - isAdmin(TINYINT(1)) : 시스템 관리자 권한 부여 여부 T/F
  - rgstApproval(TINYINT(1)) : 계정 등록 여부 T/F. FG 멤버가 회원가입을 신청하면, 관리자 계정이 이를 승인하여 본 attribute를 True로 변경
  
- LC_INFO : LC의 정보를 나타냄
  - lcIdx(INTEGER) : 각 LC 정보를 구분하는 unique value
  - year(INTEGER) : LC 멤버들의 입학년도
  - lc(INTEGER) : LC 번호
  - fgMemberId1, 2, 3 : 해당 LC를 관리하는 FG 멤버의 학번

- LC_MEMBER_INFO : LC 멤버(신입생)의 정보를 나타냄

  ※ 원래는 FG_MEMBER_INFO와 스키마 구조가 유사하였으나, FG가 교무처로부터 제공받는 신입생 명단 excel 파일의 구조를 파악한 이후 그 구조에 맞게 스키마를 변경하였음

  - lcMemberId(INTEGER) : 해당 LC 멤버 정보를 구분하는 unique value
  - lcIdx(INTEGER) : 해당 LC 정보를 구분하는 unique value
  - department(VARCHAR(N)) : LC 멤버의 학과
  - gender(VARCHAR) : LC 멤버의 성별
  - lcMemberName(VARCHAR(N)) : LC 멤버의 이름
  - contact(VARCHAR(N)) : LC 멤버의 전화번호



#### 3-3. UX 설계

![image](https://user-images.githubusercontent.com/53200166/154908822-13a5aabe-0677-468f-859d-2afbb966aaf6.png)



#### 3-4. UI 설계

![image](https://user-images.githubusercontent.com/53200166/155120863-f70a4e6b-db28-460c-9ba9-343019cc5a6c.png)



#### 3-5. API 설계

- 불가피한 경우를 제외하고 REST API URI 명명 규칙을 최대한 따르고자 하였음
- 아래 제목들은 클라이언트에 구현한 Axios 메서드들을 DB 테이블 기준으로 분류해 놓은 클래스들임



#### 3-5-1. AccountRepository

![image](https://user-images.githubusercontent.com/53200166/155120920-1718b16d-b4b2-4dcd-868f-2abed58fe063.png)



#### 3-5-2. EventRepository

![image](https://user-images.githubusercontent.com/53200166/155120974-3c6bf34d-406e-4ade-b2c4-9941b3215e50.png)



#### 3-5-3. FgMemberRepository

![image](https://user-images.githubusercontent.com/53200166/155121001-a4d99509-e0a6-464e-b5cc-8118c095ba5f.png)



#### 3-5-4. LcAttendanceCheckRepository

![image](https://user-images.githubusercontent.com/53200166/155121019-2cd744ac-f5b3-41ae-a802-bc53ed3f35f3.png)



#### 3-5-5. LcMemberRepository

![image](https://user-images.githubusercontent.com/53200166/155121091-162aa1c8-8bb5-4644-afd2-5cef4fb42573.png)



#### 3-5-6. LcRepository

![image](https://user-images.githubusercontent.com/53200166/155121127-a41a5d55-d68f-466c-86a4-d3e8a51f626b.png)



---



### 4. 시행착오

- 본 프로젝트를 진행하면서 막히거나 배웠거나 고민했거나 해결했던 부분들을 작성함



#### 4-1. 프론트엔드 개발



##### Module 'react-router' has no exported member 'switch'

[reactjs - Attempted import error: 'Switch' is not exported from 'react-router' - Stack Overflow](https://stackoverflow.com/questions/67687254/attempted-import-error-switch-is-not-exported-from-react-router)

react 버전 6부터는 `<Routes>` 로 명칭이 변경되었다고 한다.

따라서 `package.json` 에서 각 버전을 다운그레이드하여 아래와 같이 수정하였다. npmjs.com 공식 사이트에 표기되어 있는 안정된 버전이다.

```json
    "react-router": "^5.2.1",
    "react-router-dom": "^5.3.0",
```



##### Experimental support for decorators is a feature that is subject to change in a future release.

[[오류\] Experimental support for decorators is a feature that is subject to change in a future release. – ddarkBlog](https://blog.ddark.kr/Experimental-support-for-decorators-is-a-feature-that-is-subject-to-change-in-a-future-release/)

tsconfig.json에서 `compilerOptions`의 `experimentalDecorators` 항목을 `true`로 변경해주면 해결된다.



##### cannot find module ... its corresponding type declarations

src/ 경로에만 개발 중이던 파일들을 각 용도에 맞게 디렉터리들을 만들어서 이동시켰더니, import 문장들에 빨간줄이 뜨면서 위와 같은 오류 메시지가 발생했다.

https://pythonq.com/so/import/1867577

tsconfig.json의 compilerOptions에서 baseUrl을 "."으로 설정하면 해결된다.



##### JSX.Element[] 배열 안에 HTML 태그를 push한 것을 return할 때 렌더링이 안 되는 문제

```react
const panelData: JSX.Element[] = [];

...

panelData.push(
	<...>...<...> // HTML 태그
);

...

return (
	...
	<div>{panelData}</div>
	...
);
```

단순히 위와 같이 적으면 렌더링이 되지 않는다.

```react
const [panel, setPanel] = useState<JSX.Element[]>();
const panelData: JSX.Element[] = [];

...

panelData.push(
	<...>...<...> // HTML 태그
);

...

setPanel(panelData);

return (
	...
	<div>{panelData}</div>
	...
);
```

위와 같이 JSX.Element[] 배열을 useState()에 넣어놓고 return하면 정상적으로 렌더링이 된다.



##### observable 데코레이터 하나만으로는 제기능을 하지 못함

생성자에서 `makeObservable(this);` 라는 메서드를 사용해야 비로소 실시간으로 관찰하게 됨



##### Parsing error: Missing semicolon

아래와 같은 Type Cast 문장에서 `as` 부분에 아래와 같은 에러 메시지가 발생하였다.

```react
const temp = data as { d1:number; d2:number };
```

[javascript - React Typescript Type Cast Issue - Parsing Error: Missing Semicolon - Stack Overflow](https://stackoverflow.com/questions/67412890/react-typescript-type-cast-issue-parsing-error-missing-semicolon)

ESLint config file에 아래 문구를 추가하면 해결된다.

```json
"parser": "@typescript-eslint/parser"
```



##### 시큐어 코딩

로그인 기능을 만들고자 하였는데, 만약 웹 개발을 Spring Boot 하나만으로 해결한다면 (즉 View는 Thymeleaf로 개발) '스프링 인 액션 5' 교재에서 학습하였던 스프링 시큐리티 개념을 적용하면 되었을 것이다. 그런데 나는 클라이언트를 React.JS로 개발하고, Spring Boot는 서버 기능만을 수행하기 때문에, 로그인 기능을 구현할 별도의 방법을 찾아보아야 했다.

[NodeJS - crypto(단방향 암호화) (velog.io)](https://velog.io/@neity16/NodeJS-crypto단방향-암호화)

[Node.js - 바람직한 비밀번호 암호화 (crypto) | zinirun](https://zinirun.github.io/2020/12/02/node-crypto-password/)

```react
// salt값 만드는 코드
const salt = crypto.randomBytes(64).toString('base64');
// 해싱된 패스워드 만드는 코드
const hashedPassword = crypto.pbkdf2Sync(password, salt, 9999, 64, 'sha512').toString('hex');
```

패스워드는 위와 같은 방법으로 암호화해서 DB에 저장하고, 로그인에 성공하면 계정명을 브라우저의 localStorage에 임시 저장해놓는 방식으로 해결하였다. 향후 해당 계정명 또한 해싱된 값으로 저장함으로써 보안 강화를 꾀할 필요가 있겠다.



##### Ant Design (antd) 라이브러리를 사용한 이유?

1. 초보자가 사용하기 편하다.
2. 현직자에게 자문을 구한 결과, antd는 백오피스의 개발에 적합한 라이브러리 중 하나라고 한다.
3. 다양한 예시문이 많다.
   - 테이블 편집 시 사용자 편의성을 위해 단순히 셀을 클릭하기만 해서 편집이 될 수 있는 Editable Table을 구현하고자 하였고, 실제로 구현에 성공하였다. 그런데 antd 레퍼런스 사이트에는 내가 구현한 테이블보다 더 코드가 간결하고 디자인이 예쁜 테이블 소스코드를 참조하여 사용할 수 있었다.

[백오피스를 고민하다 (velog.io)](https://velog.io/@yoonkangho/백오피스를-고민하다)
[리액트 UI 라이브러리에 대한 정리 (tistory.com)](https://jnarin-development-story.tistory.com/46)

[TIL | 리액트 UI 라이브러리 5가지 (velog.io)](https://velog.io/@leeeunbin/TIL-React-UI-라이브러리-5가지)



##### Form tag 안에 소속되어 있는 antd Input tag의 안에 있는 value 값을 state로 설정해도 렌더링이 안 되는 문제

전화번호 입력 시, `-` 를 자동으로 입력하거나 제거하는 기능을 만들고자 하여, 아래와 같이 코드를 작성하였음

```react
const [contact, setContact] = useState<string>('');

const changeContact = () => {
    if(/*'-'를 붙이거나 떼어야 하는 상황이 오면*/) {
       		/* statements */
       		setContact(changedContact);
       }
}

return (
	...
    <Form ...>
        <Form.Item>
            <Input value={state} onChange={e => setState(e.target.value)} />
        </Form.Item>
    </Form>
)
```

그런데 만약 사용자가 `010`까지 입력한다면, `Input` tag 안의 값이 `010-` 으로 렌더링되어야 하는데 이 작업이 이루어지지 않았음.

즉, `contact` 라는 state 안의 값은 `010-` 으로 잘 저장이 되었지만 이게 렌더링은 되지 않고 사용자의 눈에는 `010`만 보이는 상황이었음

https://stackoverflow.com/questions/70224700/value-prop-does-not-show-data-in-input-in-ant-design

`Form` tag 안의 `fields`를 아래와 같이 채워줬더니, 의도한 대로 정상 동작하였음

```react
<Form
    fields={[
        name: 'contact',
        value: {contact},
    ]}
    ...
    >
	<Form.Item name='contact'>
        <Input onChange={e => setState(e.target.value)} />
    </Form.Item>
</Form>
```



#### 4-2.  백엔드 개발

##### CORS Policy

한 컴퓨터에서 클라이언트 및 서버를 실행하고 서로에게 HTTTP 요청/응답을 보내려고 하면 **Access to XMLHttpRequest has been blocked by CORS policy** 라는 메시지를 콘솔에 띄우며 오류가 발생한다.
그 이유는 CORS Policy 때문임

https://coding-groot.tistory.com/91
https://kamang-it.tistory.com/entry/Web%EB%8F%99%EC%9D%BC-%EC%B6%9C%EC%B2%98-%EC%A0%95%EC%B1%85-CORS-%EB%8F%84%EB%8C%80%EC%B2%B4-%EB%AD%98%EA%B9%8C

따라서 CORS 표준을 지키기 위해 아래와 같은 클래스를 작성하였음

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {

    registry.addMapping("/**")
        .allowedOrigins("*")
        .allowedMethods("GET", "PUT", "POST", "DELETE");
  }
}
```



##### JPQL 사용 시 주의점

https://stay-hungry.tistory.com/20

https://kkamdung.tistory.com/120

`JpaRepository`를 `extends`하는 Repository 안에서 어떤 메서드에 `@Query` Annotation을 붙이고 `SELECT ... FROM table_name` String을 안에 집어넣어줬을 때, 즉 `@Query("SELECT ... FROM table_name")` 라고 작성했을 때, 'table_name' 위치에는 실제 데이터베이스의 테이블명도 아니고 `@Table(name = "...")` Annotation 안의 '...'도 아닌, 해당 Entity의 클래스명을 입력해주어야 한다.



##### JPA 사용 시 테이블명이 대문자일 때 테이블을 찾지 못하는 문제

https://velog.io/@gillog/JPA-Spring-Boot-JPA-Entity-Table-%EB%8C%80-%EC%86%8C%EB%AC%B8%EC%9E%90-%EA%B5%AC%EB%B6%84-%EB%AA%BB%ED%95%98%EB%8A%94-%EA%B2%BD%EC%9A%B0-%ED%95%B4%EA%B2%B0

TEST_DB DB에 "TEST_TABLE"라는 이름의 테이블을 생성하고, Entity 클래스에 `@Table(name="TEST_TABLE")` 라고 작성하고 나서 앱을 실행하면, `Table 'TEST_DB.TEST_TABLE' doesn't exist' 에러가 발생한다. 그 이유는 Spring Boot의 기본 DB Physical Naming 전략이 아래와 같기 때문이다.

- **모든 도트는 밑줄**로 대체, **Camel Case 대문자는 밑줄**로 대체, 모든 **테이블은 소문자**로 구성

따라서 아래와 같은 설정을 `application.properties`에 추가해야 한다.

- `spring.jpa.hibernate.naming.physical-strategy = org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl`



##### JPA 사용 시 delete가 안 되는 문제

https://velog.io/@moonyoung/JPA-JPA-Repository-%EC%88%98%EC%A0%95%EC%82%AD%EC%A0%9C%EC%99%80-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98

https://happyer16.tistory.com/entry/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9A%94%EC%B2%ADrequest%EC%8B%9C-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EC%8B%9C%EC%9E%91%EC%9D%80-%EC%96%B4%EB%94%94%EC%84%9C-%ED%95%A0%EA%B9%8C

Custom delete 메서드에 `@Transactional` Annotation을 붙이면 정상적으로 delete가 된다.



##### JPA vs MyBatis?

JPA의 기능이 방대하고 거대한 것 같아서 본 프로젝트에서 사용하기에는 한계가 있는 듯

- 구글링 정보만으로는 한계를 느껴서 김영한님의 JPA 프로그래밍 교재를 구매하였음
- 스프레드시트 프로젝트의 경우 개발하면서 배워나간다는 느낌으로 JPA를 적용하였으나, 이와 달리 본 프로젝트는 당장 구현해서 실사용에 돌입해야 한다는 느낌이 강하므로, 티맥스소프트에서 익숙해져 있던 MyBatis로 변경하기로 함



##### Unable to find a @SpringBootConfiguration, you need to use @ContextConfiguration or @SpringBootTest(classes=...) with your test

[스프링부트 에러\] Unable to find a @SpringBootConfiguration, you need to use @ContextConfiguration or @SpringBootTest(classes=...) with your test (tistory.com)](https://jjunii486.tistory.com/172)

`@SpringBootApplication` Annotation이 붙은 클래스가 존재하는 패키지의 하위 패키지에 테스트 코드를 두어야 한다.



##### 0x7e) was found in the public identifier.

https://stackoverflow.com/questions/2834453/tilde-not-recognised-in-xml-public-identifier

xml 인코딩 문제 때문에 발생한 에러로, `~` 문자를 `%7e` 로 바꾸면 해결된다.



##### invalid bound statement (not found)

[[Mybatis\]invalid bound statement (not found) 에러 | 두발로걷는개 (twofootdog.github.io)](https://twofootdog.github.io/Mybatis-Invalid-bound-statement(not-found)-에러/)

```javascript
mybatis.type-aliases-package=mybatis.mapper.mybatis-config.xml
mybatis.mapper-locations=mybatis.mapper.**.*.xml
```

경로 중 `**`로 표현되는 부분 때문에 Mapper의 xml 경로를 찾지 못해서 발생하는 문제였다. 아래와 같이 `/`를 사용하여 경로를 나타내주었더니 문제가 해결되었다.

```javascript
mybatis.type-aliases-package=mybatis/mapper/mybatis-config.xml
mybatis.mapper-locations=mybatis/mapper/**/*.xml
```



---



### 부록. 사용 시나리오

#### 메인 (로그인) 화면

![image](https://user-images.githubusercontent.com/53200166/155125175-4bcf2d62-85c1-4090-bac5-8092030434ad.png)

- '일반' Radio Button을 누르면 일반 로그인을, '관리자' Radio Button을 누르면 관리자 로그인을 수행한다.
- 일반 로그인은 FG 멤버가 LC 멤버들에 대한 정보를 관리하고자 할 때, 관리자 로그인은 관리자 권한을 가진 FG 멤버가 FG 멤버들, LC, LC 멤버들, 행사에 대한 정보를 관리하고자 할 때 이루어진다.



![image](https://user-images.githubusercontent.com/53200166/155125388-4a2683bf-d5e8-4df1-a090-a548081468d6.png)

- 메인 화면에서 '회원가입' 버튼을 클릭하면 위와 같은 Modal이 활성화된다.
- 위와 같은 일련의 정보들을 모두 입력하지 않으면 회원가입이 이루어지지 않는다.
- 학번, 전화번호, 이메일 등에 대해서는 각 속성에 따른 정규표현식을 만족하지 않으면 회원가입이 이루어지지 않는다.
- FG 멤버가 본인의 정보를 위 화면에서 입력하여 회원가입을 완료하면, 관리자가 관리자 페이지에서 FG 멤버 관리 화면을 켜고 계정 등록을 수행하여야 이후 로그인을 할 수 있게 된다.



#### FG 멤버 관리 화면

![image](https://user-images.githubusercontent.com/53200166/155131347-76225ee3-1ca9-4a9b-a4eb-2d2b26ad7ce4.png)

- FG 멤버에 대한 정보를 관리하는 화면이다.



![image](https://user-images.githubusercontent.com/53200166/155127705-b41c9c0e-4226-4c3c-a7b3-4051996146d1.png)

- 해당 화면에서 좌측 상단의 화살표를 클릭하면, 기수를 선택하는 Drawer가 활성화된다.
- 해당 Drawer에서 기수를 선택하면, 해당 기수에 속하는 FG 멤버 관련 정보를 JOIN하여 불러와 테이블에 렌더링한다.



![image](https://user-images.githubusercontent.com/53200166/155131859-8e063b50-d238-49ef-a5eb-685fe3f209a9.png)

- 테이블의 각 Column은 fg_member_info 테이블과 account_info의 데이터들을 fgMemberId를 기준으로 JOIN하여 SELECT해 가져온 것이다.
- 좌측의 Checkbox를 클릭하면 우측 상단의 '삭제' 버튼이 활성화되며, 이를 클릭하면 실제로 DB에서 해당하는 FG 멤버들의 정보가 fg_member_info 및 account_info 테이블에서 DELETE된다.
- 그 외의 각 Cell을 클릭하면 해당 Cell에 대하여 편집이 가능하며, 편집 종료 시 편집된 내용이 DB에 UPDATE되는 Editable Table이다.
  단, '학번' 컬럼은 편집이 불가능하다.
- 우측의 '관리자' 셀을 클릭하면 관리자 권한이 부여/박탈되며, '등록' 셀을 클릭하면 계정이 등록/등록취소 되어 일반 로그인 권한을 획득/박탈하게 된다.



![image](https://user-images.githubusercontent.com/53200166/155128512-6de1edfd-8507-4a7d-a597-749bf1e34d3a.png)

- 우측 상단의 '검색' 버튼을 클릭하면, 위와 같은 Modal이 활성화된다.
- 위 Modal에서 각 옵션에 대하여 기입하면, 기입한 옵션과 부합하는 FG 멤버 관련 정보들을 다시 SELECT하여 테이블에 리렌더링한다.
- 기입하지 않은 옵션에 대해서는 전체 SELECT를 한다.



![image](https://user-images.githubusercontent.com/53200166/155132813-902d1731-45aa-4b3a-ad21-79daa99e072f.png)

![image](https://user-images.githubusercontent.com/53200166/155128579-c9cd1f27-771b-4a79-8024-20431506bdb9.png)

- '엑셀로 저장' 버튼을 클릭하면 렌더링되고 있던 테이블의 데이터들을 엑셀 형태로 다운로드한다.



#### LC 관리 화면

![image](https://user-images.githubusercontent.com/53200166/155133138-7aa8d7f4-203f-415b-aa66-d5e8be8d4344.png)

- LC에 대한 정보를 관리하는 화면이다.
- UI는 전반적으로 **FG 멤버 관리** 화면과 유사하다.
- Drawer 화살표 버튼, '검색', '엑셀로 저장', '삭제' 버튼의 기능 또한 **FG 멤버 관리** 화면과 유사하다.

- 년도 및 LC 컬럼은 편집이 불가능하다.



![image](https://user-images.githubusercontent.com/53200166/155129104-42df2f41-218c-494c-a35f-3e25ff1dd1c5.png)

- 담당자 셀을 클릭하면 위와 같은 Modal이 활성화된다.
- 위 Modal에서 검색하고자 하는 FG 멤버 정보를 검색한 뒤, Radio Button을 클릭(즉, FG 멤버를 선택)하여 '완료' 버튼을 누르면 앞서 선택했던 담당자 셀에 UPDATE한다.
- 위 Modal에서 Radio Button이 선택되어 있지 않으면 '삭제' 버튼이 활성화 된 상태이며, 이 '삭제' 버튼을 클릭하면 앞서 선택했던 담당자 셀이 NULL로 UPDATE된다(화면에는 `-`로 리렌더링된다).



![image](https://user-images.githubusercontent.com/53200166/155129179-0b17ded2-bc48-429d-bc7f-04c4973f4dc4.png)

- '추가' 버튼을 클릭하면 위와 같은 Modal이 활성화된다.
- 위 Modal에서 각 옵션에 대하여 기입하면, 기입한 옵션에 맞추어 DB의 lc_info에 INSERT된다.
  예를 들어, 위 화면에서는 "2005"년도의 "LC1" ~ "LC13"이 INSERT된다.



#### LC 멤버 관리 화면

![image](https://user-images.githubusercontent.com/53200166/155134722-1d66efb2-9dfa-491c-b3e6-3c8c4d825252.png)

- LC 멤버에 대한 정보를 관리하는 화면이다.
- UI는 전반적으로 **FG 멤버 관리**, **LC 관리** 화면과 유사하다.
- Drawer 화살표 버튼, '검색', '엑셀로 저장', '삭제' 버튼의 기능 또한 **LC 관리** 화면과 유사하다.

- 년도 및 LC 컬럼은 편집이 불가능하다.



![image](https://user-images.githubusercontent.com/53200166/155134235-77650fb1-b48d-436b-8f01-b9949de37ad0.png)

- '추가' 버튼을 클릭하면 위와 같은 Modal이 활성화된다.
- 위 Modal에서 각 옵션에 대하여 기입하면, 기입한 데이터들이 DB의 lc_member_info에 INSERT된다.



![image](https://user-images.githubusercontent.com/53200166/155129307-b9b4ede4-ff1c-499b-9ee8-78757153b27e.png)

- '엑셀로 추가' 버튼을 클릭하면 위와 같은 modal이 활성화된다.
- 위 Modal을 통해 엑셀 파일을 선택하고 '업로드' 버튼을 클릭하면, 엑셀 파일 내부의 데이터들이 DB의 lc_member_info에 INSERT된다.



#### 행사 관리 화면

![image](https://user-images.githubusercontent.com/53200166/155135676-fe7136ef-c298-4ae3-8bfe-3a13a5545989.png)

- 행사를 등록하는 화면이다. 이 화면에서 행사를 등록하면, 이후 해당 날짜가 되었을 때 (당일) 출석 체크 또는 출결 관리 화면에서 출결을 관리할 수 있다.



![image](https://user-images.githubusercontent.com/53200166/155129412-1a941297-e97d-44c6-9e9f-6a3a86655bbb.png)

- 캘린더에서 특정 날짜를 클릭하면 위와 같은 Modal이 활성화된다.
- 위 Modal에서 각 옵션들을 기입하여 행사를 추가하면, 기입한 데이터들을 DB의 event_info 테이블에 INSERT하며, 캘린더에 리렌더링한다.



![image](https://user-images.githubusercontent.com/53200166/155129440-f4ff663c-bfe3-4316-95c1-2ec84559238d.png)

- 같은 모달에서 '행사 확인' Radio Button을 클릭하면 해당 날짜에 등록되었던 행사 정보를 확인 및 삭제할 수 있다.



#### LC 출석 체크 화면

![image](https://user-images.githubusercontent.com/53200166/155136280-56829061-d3d0-4854-a1e4-e3c2cf75fe01.png)

- LC 멤버들의 출석 체크를 수행하는 화면이다. 바로 오늘을 가리키는 년월일에 해당하는 이벤트 및 LC에 대한 출석 체크만 수행한다.
- 먼저 당일에 속해 있는 행사를 선택한 뒤, 로그인한 본인, 즉 해당 FG 멤버가 담당자로 등록되어 있는 당해년도의 LC를 선택하여 '가져오기' 버튼을 클릭하면 해당 행사에 대한 해당 LC 멤버들의 출석 정보들을 JOIN하여 SELECT 해오며, 위와 같이 렌더링된다.

- 출석체크 컬럼이 `결석`으로 되어 있고, 비고가 `-`으로 되어 있다면, 해당 행은 실제로 DB에 데이터가 존재하지 않는 행이다. 즉, DB의 lc_attendance_check_info 테이블에는 `출석` 및 `지각` 정보만 주로 저장이 된다. 단, `결석` 정보이지만 '비고'가 채워져 있다면 DB에 저장된다. 
- 계열, 성별 및 이름 컬럼은 편집이 불가능하다.



![image](https://user-images.githubusercontent.com/53200166/155136357-44f5827f-3d05-4402-8865-673f781420e3.png)

- `결석` 버튼을 누르면 `출석`으로, `출석` 버튼을 누르면 `지각`으로, `지각` 버튼을 누르면 `결석`으로 바뀌며, DB의 lc_attendance_check_info 테이블에 CRUD 된다.



#### LC 출결 관리 화면

- 날짜와 관계없이 모든 LC 멤버들의 모든 출석 정보를 관리하는 화면이다.
- UI는 전반적으로 **행사 관리** 화면과 유사하다.



![image](https://user-images.githubusercontent.com/53200166/155130149-af6acab1-075e-479a-88d9-f64feebf2613.png)

- 캘린더에서 특정 날짜를 클릭하면 위와 같은 Modal이 활성화된다.
- 위 Modal에서 해당 날짜에 속해 있는 행사 하나를 선택하면, 아래와 같이 로그인한 본인, 즉 해당 FG 멤버가 담당자로 등록되어 있는 LC를 선택하는 Modal이 활성화된다.



![image](https://user-images.githubusercontent.com/53200166/155130165-fa1288e3-69ec-4dfd-8d61-5575f7d94df7.png)

위 Modal에서 LC를 선택하면, 앞서 선택했던 행사에 대한 해당 LC 멤버들의 출석 정보들을 JOIN하여 SELECT 해오며, 아래와 같이 렌더링된다.



![image](https://user-images.githubusercontent.com/53200166/155130190-b3b0ce7c-a1b6-4c57-9a62-c533ef9d4d65.png)

- 위 테이블의 전반적인 기능은 **LC 출석 체크**의 테이블과 같다.
