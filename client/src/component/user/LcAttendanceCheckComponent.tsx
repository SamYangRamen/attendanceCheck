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
  Result,
  Select,
  Space,
  Table,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { EventTableInfo } from 'repository/EventReposptory';
import useStore from 'store/useStore';
import { columnType } from 'component/table/EditableTable';
import { LcFKTableInfo } from 'repository/LcRepository';
import LcAttendanceCheckTableComponent from './LcAttendanceCheckTableComponent';

const { Option } = Select;

const LcAttendanceCheckComponent: React.FC = () => {
  const [form] = Form.useForm();
  const { repositoryStore } = useStore();
  const eventRepo = repositoryStore.getEventRepository();
  const lcRepo = repositoryStore.getLcRepository();

  const todayString: string = moment(new Date()).format('YYYY-MM-DD');

  const [eventInfoListOfDay, setEventInfoListOfDay] = useState<EventTableInfo[]>([]);
  const [selectedEventInfo, setSelectedEventInfo] = useState<EventTableInfo | undefined>();
  const [lcFKTableInfoList, setLcFKTableInfoList] = useState<LcFKTableInfo[]>([]);
  const [selectedLcFKInfo, setSelectedLcFKInfo] = useState<LcFKTableInfo | undefined>();
  const [onTable, setOnTable] = useState<boolean>(false);

  useEffect(() => {
    eventRepo
      .getEventTableInfoByYearAndMonthAndDayAndEventType(
        moment(todayString).year(),
        moment(todayString).month() + 1,
        moment(todayString).date(),
        'LC'
      ) // month값은 zero-indexed value이기 때문에, 1월은 0 ~ 12월은 11
      .then(response => {
        setEventInfoListOfDay(response);
      })
      .catch(e => {
        alert('오류가 발생했습니다.');
      });

    lcRepo
      .getLcFKTableInfoListByFgMemberIdAndYear(
        parseInt(window.localStorage.getItem('fgMemberId')!),
        moment(todayString).year()
      )
      .then(response => {
        setLcFKTableInfoList(response);
      })
      .catch(e => {
        alert('오류가 발생했습니다.');
      });
  }, []);

  const onFinish = () => {
    setOnTable(true);
  };

  return (
    <div>
      <Form layout="inline" style={{ justifyContent: 'right', margin: '1vw' }}>
        <Form.Item label="행사명">
          <Select
            style={{ width: 260 }}
            showSearch
            optionFilterProp="children"
            onChange={(index: number) => {
              setSelectedEventInfo(eventInfoListOfDay[index]);
            }}
          >
            {eventInfoListOfDay.map<JSX.Element>((value, index) => (
              <Option value={index}>{value.eventName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="LC">
          <Select
            style={{ width: 130 }}
            showSearch
            optionFilterProp="children"
            onChange={(index: number) => {
              setSelectedLcFKInfo(lcFKTableInfoList[index]);
            }}
          >
            {lcFKTableInfoList.map<JSX.Element>((value, index) => (
              <Option value={index}>{value.lc}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            form="fgMemberTableInfoSearch"
            type="primary"
            disabled={!(!!selectedEventInfo && !!selectedLcFKInfo)}
            onClick={onFinish}
          >
            가져오기
          </Button>
        </Form.Item>
      </Form>
      {onTable ? (
        <LcAttendanceCheckTableComponent
          eventInfo={selectedEventInfo}
          lcFKTableInfo={selectedLcFKInfo}
        ></LcAttendanceCheckTableComponent>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LcAttendanceCheckComponent;
