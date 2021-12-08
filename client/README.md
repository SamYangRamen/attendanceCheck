# Freshman Guide 출석체크 시스템



성균관대학교 내 신입생 교육 목적의 공인 단체 Freshman Guide에서 내부적으로 기존에 사용하던 출석체크 시스템이 뻗어버려서, 이를 대체하는 신규 시스템을 개발하고자 본 프로젝트를 시작하게 되었음



## 개발 과정



### 초기 환경설정

1. 프로젝트 생성 및 세팅

   ```bash
   npx create-react-app [appname] --template=typescript
   npm install react-router@5.2.1
   npm install react-router-dom@5.3.0
   npm i --save-dev @types/react-router
   npm i --save-dev @types/react-router-dom
   ```

2. ESLint 적용

   ※ [Eslint & Prettier 설정 방법 (velog.io)](https://velog.io/@njh7799/Eslint-Prettier-설정-방법) 를 참고하였음

   - Extension에서 ESLint 및 Prettier 설치

   - 명령어를 통해 각종 필요한 모듈 설치

     ```bash
     npm install eslint --save-dev
     npm install prettier --save-dev
     npm install --save-dev eslint-plugin-prettier
     npm install --save-dev eslint-config-prettier
     npm install eslint-plugin-import eslint-config-airbnb-base --save-dev
     ```

   - ESLint Extension Settings -> `Editor: Code Actions On Save` 찾기 -> `Edit in settings.json` 클릭 -> 아래 문구 입력

     ```json
     {
       "editor.formatOnSave": true,
       "eslint.format.enable": true,
       "editor.formatOnType": true,
       "stylelint.enable": true,
       "editor.codeActionsOnSave": {
         "source.fixAll.eslint": true
       },
       "editor.defaultFormatter": "esbenp.prettier-vscode"
     }
     ```

   - .eslintrc.js 설정 (없으면 생성)

     ```json
     {
       "extends": ["prettier", "prettier"],
       "plugins": ["prettier"],
       "rules": {
         "prettier/prettier": ["error"]
       },
       "parser": "@typescript-eslint/parser"
     }
     ```

   - .prettierrc.json 설정 (없으면 생성)

     ```json
     {
       "singleQuote": true,
       "semi": true,
       "useTabs": false,
       "tabWidth": 2,
       "trailingComma": "es5",
       "printWidth": 100,
       "arrowParens": "avoid",
       "endOfLine": "auto"
     }
     ```



## Trial And Error



### Errer Message



#### Module 'react-router' has no exported member 'switch'

[reactjs - Attempted import error: 'Switch' is not exported from 'react-router' - Stack Overflow](https://stackoverflow.com/questions/67687254/attempted-import-error-switch-is-not-exported-from-react-router)

react 버전 6부터는 `<Routes>` 로 명칭이 변경되었다고 한다.

따라서 `package.json` 에서 각 버전을 다운그레이드하여 아래와 같이 수정하였다. npmjs.com 공식 사이트에 표기되어 있는 안정된 버전이다.

```json
    "react-router": "^5.2.1",
    "react-router-dom": "^5.3.0",
```



#### Experimental support for decorators is a feature that is subject to change in a future release.

[[오류\] Experimental support for decorators is a feature that is subject to change in a future release. – ddarkBlog](https://blog.ddark.kr/Experimental-support-for-decorators-is-a-feature-that-is-subject-to-change-in-a-future-release/)

tsconfig.json에서 `compilerOptions`의 `experimentalDecorators` 항목을 `true`로 변경해주면 해결된다.



### Missing semicolon 문제



#### Parsing error: Missing semicolon

아래와 같은 Type Cast 문장에서 `as` 부분에 아래와 같은 에러 메시지가 발생하였다.

```react
const temp = data as { d1:number; d2:number };
```

[javascript - React Typescript Type Cast Issue - Parsing Error: Missing Semicolon - Stack Overflow](https://stackoverflow.com/questions/67412890/react-typescript-type-cast-issue-parsing-error-missing-semicolon)

ESLint config file에 아래 문구를 추가하면 해결된다.

```json
"parser": "@typescript-eslint/parser"
```



## 학습 내용



### Link를 이용해 값을 전달하는 방법

```react
<Link
  to={{
    pathname: '/login',
    state: {
      data1: false,
      data2: 100,
    },
  }}
>
  <input type="button" name="loginButton" value="로그인" />
</Link>
```

```react
const FooComponent: React.FC<RouteComponentProps> ({location}) => {
	const data = location.state as { data1: boolean, data2: number };
	...
}
```



### 시큐어 코딩

[NodeJS - crypto(단방향 암호화) (velog.io)](https://velog.io/@neity16/NodeJS-crypto단방향-암호화)

[Node.js - 바람직한 비밀번호 암호화 (crypto) | zinirun](https://zinirun.github.io/2020/12/02/node-crypto-password/)

```react
// salt값 만드는 코드
const salt = crypto.randomBytes(64).toString('base64');

// 해싱된 패스워드 만드는 코드
const hashedPassword = crypto.pbkdf2Sync(password, salt, 9999, 64, 'sha512').toString('hex');
```



### Radio Button

[How to Use Radio Buttons in ReactJS | Pluralsight](https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs)

```react
return (
  <div onChange={this.onChangeValue}>
    <input type="radio" value="Male" name="gender" /> Male
    <input type="radio" value="Female" name="gender" /> Female
    <input type="radio" value="Other" name="gender" /> Other
  </div>
);
```

