import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import crypto from 'crypto';

const LoginComponent: React.FC<RouteComponentProps> = ({ location, history }) => {
  const { valueStore, repositoryStore } = useStore();
  const repo = repositoryStore.getAccountRepository();

  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [permission, setPermission] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == 'isCommon') setPermission(false);
    else if (e.target.name == 'isAdmin') setPermission(true);
    else if (e.target.name == 'account') setAccount(e.target.value);
    else if (e.target.name == 'password') setPassword(e.target.value);
  };

  const onClick = (e: any) => {
    if (e.target.name == 'login') {
      repo
        .getAccountInfo(account)
        .then(response => {
          if (!response.registerApproval) {
            alert('등록되지 않은 계정입니다.');
            return;
          }

          const hashedPassword = crypto
            .pbkdf2Sync(password, response.salt, 9999, 64, 'sha512')
            .toString('hex');

          if (hashedPassword == response.password) {
            alert('아이디 또는 패스워드가 일치하지 않습니다.');
            return;
          }

          if (permission && !response.isAdmin) {
            alert('관리자로 등록되지 않은 계정이거나 없는 계정입니다.');
            return;
          }

          valueStore.setFgMemberId(response.fgMemberId);
          valueStore.setIsAdmin(response.isAdmin);
          history.push(permission ? '/admin' : '/user');
        })
        .catch(e => {
          alert('등록되지 않은 계정입니다.');
        });
    } else if (e.target.name == 'cancel') {
      history.goBack();
    }
  };

  return (
    <div>
      <div onChange={onChange}>
        일반 <input type="radio" name="isCommon" checked={!permission}></input>
        관리자 <input type="radio" name="isAdmin" checked={permission}></input>
      </div>
      <input type="text" name="account" value={account} onChange={onChange}></input>
      <br />
      <input type="password" name="password" value={password} onChange={onChange}></input>
      <br />
      <input type="button" name="login" value="확인" onClick={onClick}></input>
      <input type="button" name="cancel" value="취소" onClick={onClick}></input>
    </div>
  );
};

export default LoginComponent;
