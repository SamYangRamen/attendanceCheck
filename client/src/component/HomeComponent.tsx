import React from 'react';
import { Link } from 'react-router-dom';
import FgMemberRegisterComponent from './connect/FgMemberRegisterComponent';
import '../scss/home.scss';
import LoginComponent from './connect/LoginComponent';

const HomeComponent: React.FC = () => {
  return (
    <div>
      <LoginComponent></LoginComponent>
      <FgMemberRegisterComponent buttonName="회원가입"></FgMemberRegisterComponent>
    </div>
  );
};

export default HomeComponent;
