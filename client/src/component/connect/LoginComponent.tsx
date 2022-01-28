import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import crypto from 'crypto';

const LoginComponent: React.FC = () => {
  const { valueStore, repositoryStore } = useStore();
  const repo = repositoryStore.getAccountRepository();

  const [onOffSwitch, setOnOffSwitch] = useState<boolean>(false);
  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [permission, setPermission] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    setAccount('');
    setPassword('');
    setPermission(false);
  }, [onOffSwitch]);

  const onOff = (e: React.MouseEvent<HTMLInputElement>) => {
    setOnOffSwitch(!onOffSwitch);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == 'isCommon') setPermission(false);
    else if (e.target.name == 'isAdmin') setPermission(true);
    else if (e.target.name == 'account') setAccount(e.target.value);
    else if (e.target.name == 'password') setPassword(e.target.value);
  };

  const onClick = () => {
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

        if (hashedPassword != response.password) {
          alert('아이디 또는 패스워드가 일치하지 않습니다.');
          return;
        }

        if (permission && !response.isAdmin) {
          alert('관리자로 등록되지 않은 계정이거나 없는 계정입니다.');
          return;
        }

        valueStore.setFgMemberId(response.fgMemberId);
        valueStore.setIsAdmin(response.isAdmin);

        window.localStorage.setItem('fgmemberId', response.fgMemberId.toString());
        window.localStorage.setItem('isAdmin', response.isAdmin.toString());
        history.push(permission ? '/admin' : '/user');
      })
      .catch(e => {
        alert('등록되지 않은 계정입니다.');
      });
  };

  return (
    <div>
      <input type="button" value="로그인" onClick={onOff}></input>
      {!onOffSwitch ? (
        <></>
      ) : (
        <>
          <div className="modal" onClick={onOff}></div>
          <div className="modal_body">
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
        </>
      )}
    </div>
  );
};

export default LoginComponent;
