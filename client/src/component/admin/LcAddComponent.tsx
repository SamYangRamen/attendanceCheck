import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useState } from 'react';

const { Option } = Select;

interface Props {
  children: JSX.Element;
}

const LcAddComponent: React.FC<Props> = ({ children }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [year, setYear] = useState<number>(0);
  const [, setYearMessage] = useState<string>('');
  const [lcDepartment, setLcDepartment] = useState<string>('');
  const [startLcNumber, setStartLcNumber] = useState<number>(1);
  const [endLcNumber, setEndLcNumber] = useState<number>(1);
  const [lcMessage, setLcMessage] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const maxYear = new Date().getFullYear();

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {<div onClick={openModal}>{children ? children : ''}</div>}
      <Modal width={'800px'} visible={isModalVisible} onOk={closeModal} onCancel={closeModal}>
        <Form layout="inline" initialValues={{ layout: 'inline' }}>
          <Form.Item label="년도" rules={[{ required: true }]}>
            <Select
              showSearch
              style={{ minWidth: 130 }}
              optionFilterProp="children"
              onChange={() => {}}
              allowClear
            >
              {Array.from(
                {
                  length: maxYear - 1970,
                },
                (_, j) => (
                  <Option value={1971 + j}>{1971 + j}년</Option>
                )
              )}
            </Select>
          </Form.Item>
          <Form.Item label="학과약자" rules={[{ required: true }]}>
            <Input
              value={lcDepartment}
              style={{ width: 130 }}
              onChange={() => {}}
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item label="LC 범위" rules={[{ required: true }]}>
            <InputNumber
              value={startLcNumber}
              style={{ width: 130 }}
              onChange={() => {}}
            ></InputNumber>
            ~
            <InputNumber
              value={endLcNumber}
              style={{ width: 130 }}
              onChange={() => {}}
            ></InputNumber>
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <Button type="primary" onClick={() => {}}>
              검색
            </Button>
          </Form.Item>
        </Form>
        <br />
        <Form>
          <Form.Item rules={[{ required: true }]}></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LcAddComponent;
