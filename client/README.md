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



### Form tag 안에 소속되어 있는 antd Input tag의 안에 있는 value 값을 state로 설정해도 렌더링이 안 되는 문제

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

위 링크의 조언에 따라 `Form` tag 안의 `fields`를 아래와 같이 채워줬더니, 의도한 대로 정상 동작하였음

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



### moment 월 계산하기

```react
moment('2022-09-22').month()
```

`moment.month()` 메서드는 1월을 0으로 ~ 12월을 11로 보기 때문에 위 코드는 9월 - 1인 8을 출력한다.



## 학습 내용



### Link를 이용해 값을 전달하는 방법

```react
<Link  to={{    pathname: '/login',    state: {      data1: false,      data2: 100,    },  }}>  <input type="button" name="loginButton" value="로그인" /></Link>
```

```react
const FooComponent: React.FC<RouteComponentProps> ({location}) => {	const data = location.state as { data1: boolean, data2: number };	...}
```



### 시큐어 코딩

[NodeJS - crypto(단방향 암호화) (velog.io)](https://velog.io/@neity16/NodeJS-crypto단방향-암호화)

[Node.js - 바람직한 비밀번호 암호화 (crypto) | zinirun](https://zinirun.github.io/2020/12/02/node-crypto-password/)

```react
// salt값 만드는 코드const salt = crypto.randomBytes(64).toString('base64');// 해싱된 패스워드 만드는 코드const hashedPassword = crypto.pbkdf2Sync(password, salt, 9999, 64, 'sha512').toString('hex');
```



### Radio Button

[How to Use Radio Buttons in ReactJS | Pluralsight](https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs)

```react
return (  <div onChange={this.onChangeValue}>    <input type="radio" value="Male" name="gender" /> Male    <input type="radio" value="Female" name="gender" /> Female    <input type="radio" value="Other" name="gender" /> Other  </div>);
```

