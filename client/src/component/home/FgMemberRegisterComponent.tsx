import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import crypto, { randomBytes } from 'crypto';
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
                  '???????????? ????????? ?????????????????????.\n???????????? ????????? ??????????????? ????????? ?????? ????????????????????????.'
                );
                closeModal();
              }
            })
            .catch(e => {
              alert(e);
            });
        } else {
          alert('?????? ???????????? ?????? ?????? ?????? ??????????????????.');
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
            ??????
          </Button>,
          <Button type="primary" onClick={closeModal}>
            ??????
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
            label="??????"
            name="fgMemberId"
            rules={[
              { required: true, message: '????????? ??????????????????.' },
              { pattern: /^(19|20)[0-9]{2}31[0-9]{4}$/g, message: '????????? ???????????? ??????????????????.' },
            ]}
          >
            <Input
              style={{ width: 260 }}
              onChange={e => setFgMemberId(parseInt(e.target.value) || 0)}
            ></Input>
          </Form.Item>
          <Form.Item
            label="????????????"
            name="password"
            rules={[
              { required: true, message: '6??? ????????? ??????????????? ??????????????????.' },
              { pattern: /^.{6,}$/g, message: '6??? ????????? ??????????????? ??????????????????.' },
            ]}
          >
            <Input.Password
              style={{ width: 260 }}
              onChange={e => setPassword(e.target.value)}
            ></Input.Password>
          </Form.Item>
          <Form.Item
            label="???????????? ??????"
            name="passwordValid"
            rules={[{ pattern: new RegExp(password), message: '??????????????? ???????????? ????????????.' }]}
          >
            <Input.Password
              style={{ width: 260 }}
              onChange={e => setPasswordValid(e.target.value)}
              disabled={password.length < 6}
            ></Input.Password>
          </Form.Item>
          <Form.Item
            label="??????"
            name="generation"
            rules={[{ required: true, message: '????????? ??????????????????.' }]}
          >
            <InputNumber
              style={{ width: 130 }}
              min={1}
              max={new Date().getFullYear() - 2006}
              onChange={value => setGeneration(value)}
            ></InputNumber>
          </Form.Item>
          <Form.Item
            label="??????"
            name="fgMemberName"
            rules={[{ required: true, message: '????????? ??????????????????.' }]}
          >
            <Input style={{ width: 130 }} onChange={e => setFgMemberName(e.target.value)}></Input>
          </Form.Item>
          <Form.Item
            label="??????"
            name="position"
            rules={[
              {
                required: true,
                message: `????????? ??????????????????.`,
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
              {['', '??????', '?????????', '??????', '??????'].map<JSX.Element>(value => (
                <Option value={value}>{value}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="??????"
            name="state"
            rules={[
              {
                required: true,
                message: `????????? ??????????????????.`,
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
              {['', '??????', '??????', '??????', '??????'].map<JSX.Element>(value => (
                <Option value={value}>{value}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="????????????"
            name="contact"
            rules={[
              { required: true, message: '??????????????? ??????????????????.' },
              { pattern: /^\d{2,3}-\d{3,4}-\d{4}$/g, message: '??????????????? ???????????? ??????????????????.' },
            ]}
          >
            <Input
              style={{ width: 260 }}
              onChange={e => setContact(contactAutoWriter(contact, e.target.value))}
            ></Input>
          </Form.Item>
          <Form.Item
            label="?????????"
            name="mail"
            rules={[
              { required: true, message: '????????? ????????? ??????????????????.' },
              { type: 'email', message: '????????? ????????? ???????????? ??????????????????.' },
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
