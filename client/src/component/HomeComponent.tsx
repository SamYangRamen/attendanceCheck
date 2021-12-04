import React from 'react';
import { Link } from 'react-router-dom';

const HomeComponent: React.FC = () => {
  return (
    <div>
      <Link
        to={{
          pathname: '/login',
          state: {
            isAdmin: false,
          },
        }}
      >
        <input type="button" name="loginButton" value="로그인" />
      </Link>

      <Link to="/register">
        <input type="button" name="registerButton" value="회원가입" />
      </Link>
    </div>
  );
};

export default HomeComponent;
