import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import contactAutoWriter from '../../util/contactAutoWriter';

const { Option } = Select;

interface Props {
  children: JSX.Element;
}
const LcMemberAddComponent: React.FC<Props> = ({ children }: Props) => {
  const [form] = Form.useForm();
  const { repositoryStore } = useStore();
  const lcMemberRepo = repositoryStore.getLcMemberRepository();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const maxYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(maxYear);
  const [lc, setLc] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [lcMemberName, setLcMemberName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [inputContact, setInputContact] = useState<string>('');

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onFinish = () => {
    lcMemberRepo
      .postLcMemberInfo({
        year,
        lc,
        department,
        gender,
        lcMemberName,
        contact,
      })
      .then(response => {
        if (response == true) {
          alert('LC가 성공적으로 추가되었습니다.');
        }
      })
      .catch(e => {
        alert('오류가 발생했습니다.');
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
          <Button form="lcMemberAdd" type="primary" htmlType="submit">
            완료
          </Button>,
          <Button type="primary" onClick={closeModal}>
            취소
          </Button>,
        ]}
      >
        <br />
        <Form
          id="lcMemberAdd"
          labelCol={{ style: { width: '6vw' } }}
          form={form}
          onFinish={onFinish}
          fields={[
            {
              name: 'year',
              value: year,
            },
            {
              name: 'lc',
              value: lc,
            },
            {
              name: 'department',
              value: department,
            },
            {
              name: 'gender',
              value: gender,
            },
            {
              name: 'lcMemberName',
              value: lcMemberName,
            },
            {
              name: 'contact',
              value: contact,
            },
          ]}
        >
          <Form.Item
            label="년도"
            name="year"
            rules={[{ required: true, message: '년도를 선택해주세요.' }]}
          >
            <Select
              showSearch
              style={{ width: 130 }}
              optionFilterProp="children"
              onChange={value => {
                setYear(parseInt(value));
              }}
              allowClear
            >
              {Array.from(
                {
                  length: maxYear - 2000,
                },
                (_, j) => (
                  <Option value={maxYear - j}>{maxYear - j}년</Option>
                )
              )}
            </Select>
          </Form.Item>
          <Form.Item
            label="LC"
            name="LC"
            rules={[{ required: true, message: 'LC를 입력해주세요.' }]}
          >
            <Input
              style={{ width: 130 }}
              onChange={e => {
                setLc(e.target.value);
              }}
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item
            label="계열"
            name="department"
            rules={[{ required: true, message: '계열을 입력해주세요.' }]}
          >
            <Input
              style={{ width: 260 }}
              onChange={e => {
                setDepartment(e.target.value);
              }}
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item
            label="성별"
            name="gender"
            rules={[{ required: true, message: '성별을 선택해주세요.' }]}
          >
            <Select
              style={{ width: 130 }}
              showSearch
              optionFilterProp="children"
              onChange={value => {
                setGender(value);
              }}
            >
              {['', '남', '여'].map<JSX.Element>(value => (
                <Option value={value}>{value}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="이름"
            name="lcMemberName"
            rules={[{ required: true, message: '이름을 입력해주세요.' }]}
          >
            <Input
              style={{ width: 130 }}
              onChange={e => {
                setLcMemberName(e.target.value);
              }}
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item
            label="연락처"
            name="contact"
            rules={[
              { required: true, message: '연락처를 입력해주세요.' },
              { pattern: /^\d{2,3}-\d{3,4}-\d{4}$/g, message: '연락처를 올바르게 입력해주세요.' },
            ]}
          >
            <Input
              style={{ width: 260 }}
              onChange={e => {
                setContact(contactAutoWriter(contact, e.target.value));
              }}
              allowClear
            ></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LcMemberAddComponent;
