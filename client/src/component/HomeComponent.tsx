import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FgMemberRegisterComponent from './connect/FgMemberRegisterComponent';
import '../scss/home.scss';
import { RouteComponentProps, useHistory } from 'react-router';
import LoginComponent from './connect/LoginComponent';
import { Button, Form, Input, Radio, RadioChangeEvent } from 'antd';
import useStore from '../store/useStore';
import crypto from 'crypto';

const HomeComponent: React.FC = () => {
  const { repositoryStore } = useStore();
  const accountRepo = repositoryStore.getAccountRepository();

  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [permission, setPermission] = useState<boolean>(false);

  const history = useHistory();

  const onLogin = () => {
    accountRepo
      .getAccountInfo(account)
      .then(response => {
        if (!response) {
          alert('계정 정보를 정확히 입력해주세요.');
          return;
        }

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
      <Form
        labelCol={{ style: { width: '6.5vw' } }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid red',
          width: '100%',
          minWidth: '20vw',
          maxWidth: '30vw',
          padding: '1vw',
        }}
      >
        <Form.Item>
          <Form layout="inline" style={{ justifyContent: 'space-between' }}>
            <Form.Item />
            <Form.Item>
              <Radio.Group
                value={permission}
                onChange={(e: RadioChangeEvent) => {
                  setPermission(e.target.value as boolean);
                }}
              >
                <Radio value={false}>일반</Radio>
                <Radio value={true}>관리자</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Form.Item>
        <Form.Item label="학번(또는 이메일)">
          <Input
            value={account}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccount(e.target.value)}
            autoFocus
          ></Input>
        </Form.Item>
        <Form.Item label="비밀번호">
          <Input.Password
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            onPressEnter={onLogin}
          ></Input.Password>
        </Form.Item>
        <Form.Item
          style={{ position: 'relative', left: '50%', transform: 'translate(-50%)', margin: 0 }}
        >
          <Form
            layout="inline"
            style={{ width: '100%', justifyContent: 'center' }}
            initialValues={{ layout: 'inline' }}
          >
            <Form.Item style={{ width: '25%' }}>
              <Button
                style={{ width: '100%', textAlign: 'center' }}
                type="primary"
                onClick={onLogin}
              >
                로그인
              </Button>
            </Form.Item>
            <Form.Item style={{ width: '25%' }}>
              <FgMemberRegisterComponent>
                <Button style={{ width: '100%', textAlign: 'center' }} type="primary">
                  회원가입
                </Button>
              </FgMemberRegisterComponent>
            </Form.Item>
            <Form.Item style={{ width: '25%' }}>
              <Button style={{ width: '100%', textAlign: 'center' }} type="primary" disabled>
                비밀번호 찾기
              </Button>
            </Form.Item>
          </Form>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HomeComponent;
