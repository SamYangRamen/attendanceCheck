## 환경설정



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
