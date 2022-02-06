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
import useStore from 'store/useStore';
import { columnType } from 'component/table/EditableTable';

const { Option } = Select;

interface Props {
  selectedDate: moment.Moment;
  eventInfoListOfMonth: EventTableInfo[];
  setEventInfoListOfMonth: (value: React.SetStateAction<EventTableInfo[]>) => void;
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

const EventAddComponent: React.FC<Props> = ({
  selectedDate,
  eventInfoListOfMonth,
  setEventInfoListOfMonth,
  isModalVisible,
  setIsModalVisible,
}: Props) => {
  const [form] = Form.useForm();
  const { repositoryStore } = useStore();
  const eventRepo = repositoryStore.getEventRepository();

  const [eventDate, setEventDate] = useState<moment.Moment>(selectedDate);
  const [eventType, setEventType] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [modalMenu, setModalMenu] = useState<string>('eventAdd');
  const [eventInfoListOfDay, setEventInfoListOfDay] = useState<EventTableInfo[]>([]);
  const [selectedEventInfoForDelete, setSelectedEventInfoForDelete] = useState<
    EventTableInfo | undefined
  >();

  useEffect(() => {
    setEventInfoListOfDay(
      eventInfoListOfMonth.filter(value => value.eventDate == selectedDate.format('yyyy-MM-DD'))
    );
    setEventDate(selectedDate);
  }, [selectedDate]);

  const closeModal = () => {
    setSelectedEventInfoForDelete(undefined);
    setIsModalVisible(false);
  };

  const onRowSelect = (e: EventTableInfo) => {
    setSelectedEventInfoForDelete(e);
  };

  const onFinish = () => {
    if (modalMenu == 'eventAdd') {
      eventRepo
        .postEventInfo({
          eventName,
          eventType,
          eventDate: moment(eventDate).format('yyyy-MM-DD'),
        })
        .then(response => {
          if (response == true) {
            alert('행사가 성공적으로 추가되었습니다.');

            if (
              selectedDate.year() == eventDate.year() &&
              selectedDate.month() == eventDate.month()
            ) {
              eventRepo
                .getEventTableInfoByYearAndMonthAndEventTypeForCalendar(
                  eventDate.year(),
                  eventDate.month() + 1,
                  ''
                )
                .then(response => {
                  setEventInfoListOfMonth(response);
                })
                .catch(e => {
                  alert('달력 리렌더링에 오류가 발생했습니다.');
                });
            }
          }
        })
        .catch(e => {
          alert('오류가 발생했습니다.');
        });
    } else if (modalMenu == 'eventDelete') {
      eventRepo.deleteEventInfoByEventIdx(selectedEventInfoForDelete!.key).then(response => {
        if (response == true) {
          alert('행사가 성공적으로 삭제되었습니다.');

          setEventInfoListOfMonth(
            eventInfoListOfMonth.filter(value => value.key != selectedEventInfoForDelete!.key)
          );
        }
      });
    }

    closeModal();
  };

  const changeModalMenu = (e: RadioChangeEvent) => {
    setModalMenu(e.target.value);
  };

  return (
    <div>
      <Modal
        width={'500px'}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button
            form={modalMenu}
            type="primary"
            htmlType="submit"
            disabled={
              modalMenu == 'eventDelete'
                ? !selectedEventInfoForDelete
                : modalMenu == 'eventAdd'
                ? !(!!eventDate.toString() && !!eventType && !!eventName)
                : true
            }
          >
            {modalMenu == 'eventDelete' ? '삭제' : '완료'}
          </Button>,
          <Button type="primary" onClick={closeModal}>
            취소
          </Button>,
        ]}
      >
        <Radio.Group onChange={changeModalMenu} value={modalMenu}>
          <Radio value={'eventAdd'}>행사 추가</Radio>
          <Radio value={'eventDelete'}>행사 확인</Radio>
        </Radio.Group>
        <Divider />
        {modalMenu == 'eventAdd' ? (
          <Form
            id="eventAdd"
            labelCol={{ style: { width: '6vw' } }}
            form={form}
            onFinish={onFinish}
            fields={[
              {
                name: 'eventDate',
                value: eventDate,
              },
              {
                name: 'eventType',
                value: eventType,
              },
              {
                name: 'eventName',
                value: eventName,
              },
            ]}
          >
            <Form.Item
              label="행사 날짜"
              name="eventDate"
              rules={[{ required: true, message: '년도를 선택해주세요.' }]}
            >
              <DatePicker
                onChange={(date, dateString) => {
                  setEventDate(date!);
                }}
              />
            </Form.Item>
            <Form.Item
              label="행사 대상"
              name="eventType"
              rules={[{ required: true, message: '행사 대상을 선택해주세요.' }]}
            >
              <Select
                style={{ width: 130 }}
                showSearch
                optionFilterProp="children"
                onChange={value => {
                  setEventType(value);
                }}
              >
                {['', 'FG', 'LC'].map<JSX.Element>(value => (
                  <Option value={value}>{value}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="행사 이름"
              name="eventName"
              rules={[{ required: true, message: '이름을 입력해주세요.' }]}
            >
              <Input
                style={{ width: 130 }}
                onChange={e => {
                  setEventName(e.target.value);
                }}
                allowClear
              ></Input>
            </Form.Item>
          </Form>
        ) : (
          <></>
        )}
        {modalMenu == 'eventDelete' ? (
          <Form
            id="eventDelete"
            labelCol={{ style: { width: '6vw' } }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item rules={[{ required: true }]}>
              <Table
                rowSelection={{
                  selectedRowKeys: selectedEventInfoForDelete
                    ? [selectedEventInfoForDelete.key]
                    : undefined,
                  type: 'radio',
                  onSelect: onRowSelect,
                }}
                columns={columns}
                dataSource={eventInfoListOfDay}
              />
            </Form.Item>
          </Form>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};

export default EventAddComponent;
