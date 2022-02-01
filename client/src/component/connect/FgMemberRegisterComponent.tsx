import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import crypto, { randomBytes } from 'crypto';
import DropdownContainer from '../../container/DropdownContainer';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import contactAutoWriter from '../../util/contactAutoWriter';

const { Option } = Select;

interface Props {
  children: JSX.Element;
}

const FgMemberRegisterComponent: React.FC<Props> = ({ children }: Props) => {
  const [form] = Form.useForm();

  const { repositoryStore } = useStore();
  const accountRepo = repositoryStore.getAccountRepository();
  const fgMemberRepo = repositoryStore.getFgMemberRepository();

  const [fgMemberId, setFgMemberId] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [passwordValid, setPasswordValid] = useState<string>('');
  const [generation, setGeneration] = useState<number>(new Date().getFullYear() - 2006);
  const [fgMemberName, setFgMemberName] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [mail, setMail] = useState<string>('');

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setFgMemberId(0);
    setPassword('');
    setPasswordValid('');
    setGeneration(new Date().getFullYear() - 2006);
    setFgMemberName('');
    setPosition('');
    setState('');
    setContact('');
    setMail('');
    setIsModalVisible(false);
  };

  const onFinish = () => {
    const salt = crypto.randomBytes(64).toString('base64');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 9999, 64, 'sha512').toString('hex');

    fgMemberRepo
      .postFgMemberInfo({
        fgMemberId,
        generation,
        fgMemberName,
        position,
        state,
        contact,
        mail,
      })
      .then(response => {
        if (response == true) {
          accountRepo
            .postAccountInfo({
              fgMemberId,
              password: hashedPassword,
              salt: salt,
              isAdmin: false,
              registerApproval: false,
            })
            .then(response => {
              if (response == true) {
                alert(
                  '회원가입 신청이 완료되었습니다.\n관리자의 승인이 이루어지면 메일을 통해 알려드리겠습니다.'
                );
                closeModal();
              }
            })
            .catch(e => {
              alert(e);
            });
        } else {
          alert('이미 가입되어 있는 학번 또는 이메일입니다.');
        }
      })
      .catch(e => {
        alert(e);
      });
  };

  return (
    <div>
      {<div onClick={openModal}>{children ? children : ''}</div>}
      <Modal
        width={'500px'}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={[
          <Button form="fgMemberRegister" type="primary" htmlType="submit">
            완료
          </Button>,
          <Button type="primary" onClick={closeModal}>
            취소
          </Button>,
        ]}
      >
        <br />
        <br />
        <Form
          id="fgMemberRegister"
          labelCol={{ style: { width: '6vw' } }}
          form={form}
          onFinish={onFinish}
          fields={[
            {
              name: 'fgmemberId',
              value: fgMemberId,
            },
            {
              name: 'password',
              value: password,
            },
            {
              name: 'passwordValid',
              value: passwordValid,
            },
            {
              name: 'generation',
              value: generation,
            },
            {
              name: 'fgmemberName',
              value: fgMemberName,
            },
            {
              name: 'position',
              value: position,
            },
            {
              name: 'state',
              value: state,
            },
            {
              name: 'contact',
              value: contact,
            },
            {
              name: 'mail',
              value: mail,
            },
          ]}
        >
          <Form.Item
            label="학번"
            name="fgMemberId"
            rules={[
              { required: true, message: '학번을 입력해주세요.' },
              { pattern: /^(19|20)[0-9]{2}31[0-9]{4}$/g, message: '학번을 올바르게 입력해주세요.' },
            ]}
          >
            <Input
              style={{ width: 260 }}
              onChange={e => setFgMemberId(parseInt(e.target.value) || 0)}
            ></Input>
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              { required: true, message: '6자 이상의 비밀번호를 입력해주세요.' },
              { pattern: /^.{6,}$/g, message: '6자 이상의 비밀번호를 입력해주세요.' },
            ]}
          >
            <Input.Password
              style={{ width: 260 }}
              onChange={e => setPassword(e.target.value)}
            ></Input.Password>
          </Form.Item>
          <Form.Item
            label="비밀번호 확인"
            name="passwordValid"
            rules={[{ pattern: new RegExp(password), message: '비밀번호가 일치하지 않습니다.' }]}
          >
            <Input.Password
              style={{ width: 260 }}
              onChange={e => setPasswordValid(e.target.value)}
              disabled={password.length < 6}
            ></Input.Password>
          </Form.Item>
          <Form.Item
            label="기수"
            name="generation"
            rules={[{ required: true, message: '기수를 입력해주세요.' }]}
          >
            <InputNumber
              style={{ width: 130 }}
              min={1}
              max={new Date().getFullYear() - 2006}
              onChange={value => setGeneration(value)}
            ></InputNumber>
          </Form.Item>
          <Form.Item
            label="이름"
            name="fgMemberName"
            rules={[{ required: true, message: '이름을 입력해주세요.' }]}
          >
            <Input style={{ width: 130 }} onChange={e => setFgMemberName(e.target.value)}></Input>
          </Form.Item>
          <Form.Item
            label="직책"
            name="position"
            rules={[
              {
                required: true,
                message: `직책을 선택해주세요.`,
              },
            ]}
          >
            <Select
              style={{ width: 130 }}
              showSearch
              optionFilterProp="children"
              onChange={value => {
                setPosition(value);
              }}
            >
              {['', '회장', '부회장', '팀장', '부원'].map<JSX.Element>(value => (
                <Option value={value}>{value}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="상태"
            name="state"
            rules={[
              {
                required: true,
                message: `상태를 선택해주세요.`,
              },
            ]}
          >
            <Select
              style={{ width: 130 }}
              showSearch
              optionFilterProp="children"
              onChange={value => {
                setState(value);
              }}
            >
              {['', '재학', '휴학', '유학', '졸업'].map<JSX.Element>(value => (
                <Option value={value}>{value}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="전화번호"
            name="contact"
            rules={[
              { required: true, message: '전화번호를 입력해주세요.' },
              { pattern: /^\d{2,3}-\d{3,4}-\d{4}$/g, message: '전화번호를 올바르게 입력해주세요.' },
            ]}
          >
            <Input
              style={{ width: 260 }}
              onChange={e => setContact(contactAutoWriter(contact, e.target.value))}
            ></Input>
          </Form.Item>
          <Form.Item
            label="이메일"
            name="mail"
            rules={[
              { required: true, message: '이메일 주소를 입력해주세요.' },
              { type: 'email', message: '이메일 주소를 올바르게 입력해주세요.' },
            ]}
          >
            <Input style={{ width: 260 }} onChange={e => setMail(e.target.value)}></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FgMemberRegisterComponent;
