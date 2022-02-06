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
import { EventTableInfo } from 'repository/EventReposptory';
import { columnType } from 'component/table/EditableTable';
import LcSelectForAttendanceManagementComponent from 'component/user/LcSelectForAttendanceManagementComponent';

const { Option } = Select;

interface Props {
  selectedDate: moment.Moment;
  eventInfoListOfMonth: EventTableInfo[];
  isModalVisible: boolean | undefined;
  setIsModalVisible: (value: React.SetStateAction<boolean | undefined>) => void;
}

const columns: columnType[] = [
  {
    title: '행사 이름',
    tableIndex: 'null',
    dataIndex: 'eventName',
  },
  {
    title: '행사 대상',
    tableIndex: 'null',
    dataIndex: 'eventType',
  },
  {
    title: '행사 날짜',
    tableIndex: 'null',
    dataIndex: 'eventDate',
  },
];

const EventSelectForAttendanceManagementComponent: React.FC<Props> = ({
  selectedDate,
  eventInfoListOfMonth,
  isModalVisible: isEventSelectModalVisible,
  setIsModalVisible: setIsEventSelectModalVisible,
}: Props) => {
  const [form] = Form.useForm();

  const [eventInfoListOfDay, setEventInfoListOfDay] = useState<EventTableInfo[]>([]);
  const [selectedEventInfo, setSelectedEventInfo] = useState<EventTableInfo | undefined>();
  const [isLcSelectModalVisible, setIsLcSelectModalVisible] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    setEventInfoListOfDay(
      eventInfoListOfMonth.filter(value => value.eventDate == selectedDate.format('yyyy-MM-DD'))
    );
  }, [selectedDate]);

  const closeModal = () => {
    setIsEventSelectModalVisible(false);
  };

  const onRowSelect = (e: EventTableInfo) => {
    setSelectedEventInfo(e);
  };

  const onFinish = () => {
    closeModal();
    setIsLcSelectModalVisible(true);
  };

  return (
    <div>
      <Modal
        width={'500px'}
        visible={isEventSelectModalVisible}
        onCancel={closeModal}
        footer={[
          <Button
            form="eventSelectForAttendanceManagement"
            type="primary"
            htmlType="submit"
            disabled={!selectedEventInfo}
          >
            선택
          </Button>,
          <Button type="primary" onClick={closeModal}>
            취소
          </Button>,
        ]}
      >
        <Form
          id="eventSelectForAttendanceManagement"
          labelCol={{ style: { width: '6vw' } }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item rules={[{ required: true }]}>
            <Table
              rowSelection={{
                selectedRowKeys: selectedEventInfo ? [selectedEventInfo.key] : undefined,
                type: 'radio',
                onSelect: onRowSelect,
              }}
              columns={columns}
              dataSource={eventInfoListOfDay}
            />
          </Form.Item>
        </Form>
      </Modal>
      <LcSelectForAttendanceManagementComponent
        eventInfo={selectedEventInfo!}
        isLcSelectModalVisible={isLcSelectModalVisible}
        setIsLcSelectModalVisible={setIsLcSelectModalVisible}
      ></LcSelectForAttendanceManagementComponent>
    </div>
  );
};

export default EventSelectForAttendanceManagementComponent;
