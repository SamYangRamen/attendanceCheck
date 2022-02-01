import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useState } from 'react';
import useStore from '../../store/useStore';

const { Option } = Select;

interface Props {
  children: JSX.Element;
}

const LcAddComponent: React.FC<Props> = ({ children }: Props) => {
  const [form] = Form.useForm();
  const { repositoryStore } = useStore();
  const lcRepo = repositoryStore.getLcRepository();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [lcDepartment, setLcDepartment] = useState<string>('LC');
  const [startLcNumber, setStartLcNumber] = useState<number>(1);
  const [endLcNumber, setEndLcNumber] = useState<number>(1);

  const maxYear = new Date().getFullYear();

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onFinish = () => {
    lcRepo
      .postLcRange({
        year,
        lcDepartment,
        startLcNumber,
        endLcNumber,
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
        width={'800px'}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={[
          <Button form="lcAdd" type="primary" htmlType="submit">
            완료
          </Button>,
          <Button type="primary" onClick={closeModal}>
            취소
          </Button>,
        ]}
      >
        <br />
        <Form
          id="lcAdd"
          form={form}
          layout="inline"
          initialValues={{ layout: 'inline' }}
          onFinish={onFinish}
        >
          <Form.Item label="년도" rules={[{ required: true }]}>
            <Select
              showSearch
              defaultValue={year.toString()}
              style={{ minWidth: 130 }}
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
          <Form.Item label="학과약자" rules={[{ required: true }]}>
            <Input
              value={lcDepartment}
              style={{ width: 130 }}
              onChange={e => {
                setLcDepartment(e.target.value);
              }}
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item label="LC 범위" rules={[{ required: true }]}>
            <InputNumber
              value={startLcNumber}
              style={{ width: 130 }}
              onChange={number => {
                setStartLcNumber(number);
              }}
              min={1}
            ></InputNumber>
            ~
            <InputNumber
              value={endLcNumber}
              style={{ width: 130 }}
              onChange={number => {
                setEndLcNumber(number);
              }}
              min={startLcNumber}
            ></InputNumber>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LcAddComponent;
