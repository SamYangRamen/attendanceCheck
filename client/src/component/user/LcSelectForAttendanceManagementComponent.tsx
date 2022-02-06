import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Table,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { EventTableInfo } from '../../repository/EventReposptory';
import { LcFKTableInfo } from '../../repository/LcRepository';
import useStore from '../../store/useStore';
import contactAutoWriter from '../../util/contactAutoWriter';
import { columnType } from '../table/EditableTable';
import LcAttendanceManagementComponent from './LcAttendanceManagementComponent';

const { Option } = Select;

interface Props {
  eventInfo: EventTableInfo;
  isLcSelectModalVisible: boolean | undefined;
  setIsLcSelectModalVisible: (value: React.SetStateAction<boolean | undefined>) => void;
}

const columns: columnType[] = [
  {
    title: '년도',
    tableIndex: 'null',
    dataIndex: 'year',
  },
  {
    title: 'LC',
    tableIndex: 'null',
    dataIndex: 'lc',
  },
];

const LcSelectForAttendanceManagementComponent: React.FC<Props> = ({
  eventInfo,
  isLcSelectModalVisible: isModalVisible,
  setIsLcSelectModalVisible: setIsModalVisible,
}: Props) => {
  const [form] = Form.useForm();
  const { repositoryStore } = useStore();
  const lcRepo = repositoryStore.getLcRepository();

  const [lcFKTableInfoList, setLcFKTableInfoList] = useState<LcFKTableInfo[]>([]);
  const [selectedLcFKInfo, setSelectedLcFKInfo] = useState<LcFKTableInfo | undefined>();

  const [isLcAttendanceManagementModalVisible, setIsLcAttendanceManagementModalVisible] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    lcRepo
      .getLcFKTableInfoListByFgMemberIdAndYear(
        parseInt(window.localStorage.getItem('fgMemberId')!),
        0
      )
      .then(response => {
        setLcFKTableInfoList(response);
      })
      .catch(e => {
        alert('오류가 발생했습니다.');
      });
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onRowSelect = (e: LcFKTableInfo) => {
    setSelectedLcFKInfo(e);
  };

  const onFinish = () => {
    closeModal();
    setIsLcAttendanceManagementModalVisible(true);
    console.log(selectedLcFKInfo);
    console.log(eventInfo);
  };

  return (
    <div>
      <Modal
        width={'500px'}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button
            form="lcSelectForAttendanceCheck"
            type="primary"
            htmlType="submit"
            disabled={!selectedLcFKInfo}
          >
            선택
          </Button>,
          <Button type="primary" onClick={closeModal}>
            취소
          </Button>,
        ]}
      >
        <Form
          id="lcSelectForAttendanceCheck"
          labelCol={{ style: { width: '6vw' } }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item rules={[{ required: true }]}>
            <Table
              rowSelection={{
                selectedRowKeys: selectedLcFKInfo ? [selectedLcFKInfo.key] : undefined,
                type: 'radio',
                onSelect: onRowSelect,
              }}
              columns={columns}
              dataSource={lcFKTableInfoList}
            />
          </Form.Item>
        </Form>
      </Modal>
      <LcAttendanceManagementComponent
        eventInfo={eventInfo}
        lcFKTableInfo={selectedLcFKInfo}
        isLcAttendanceManagementModalVisible={isLcAttendanceManagementModalVisible}
        setIsLcAttendanceManagementModalVisible={setIsLcAttendanceManagementModalVisible}
      ></LcAttendanceManagementComponent>
    </div>
  );
};

export default LcSelectForAttendanceManagementComponent;
