import { Badge, Calendar, Layout } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { EventTableInfo } from 'repository/EventReposptory';
import useStore from 'store/useStore';
import convertEventType from 'util/convertEventType';
import EventSelectForAttendanceCheckComponent from 'component/user/EventSelectForAttendanceManagementComponent';
import EventManageComponent from 'component/admin/EventManageComponent';

const { Header, Content, Sider } = Layout;

export type fgEvent = 'warning';
export type lcEvent = 'success';
export type todayEvent = 'processing';
export type doneEvent = 'default';

interface Props {
  calenderType: string;
}

export interface CalendarData {
  type: string;
  content: string;
}

const EventCalendarComponent: React.FC<Props> = ({ calenderType }: Props) => {
  const todayString: string = moment(new Date()).format('YYYY-MM-DD');
  const { repositoryStore } = useStore();
  const eventRepo = repositoryStore.getEventRepository();

  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [beforeSelectedDate, setBeforeSelectedDate] = useState<moment.Moment>(selectedDate);
  const [eventInfoListOfMonth, setEventInfoListOfMonth] = useState<EventTableInfo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean | undefined>();

  const eventType =
    calenderType == 'lcAttendanceManagement'
      ? 'LC'
      : calenderType == 'fgAttendanceManagement'
      ? 'FG'
      : '';

  useEffect(() => {
    eventRepo
      .getEventTableInfoByYearAndMonthAndEventTypeForCalendar(
        moment(todayString).year(),
        moment(todayString).month() + 1,
        eventType
      ) // month값은 zero-indexed value이기 때문에, 1월은 0 ~ 12월은 11
      .then(response => {
        setEventInfoListOfMonth(response);
      })
      .catch(e => {
        alert('오류가 발생했습니다.');
      });
  }, []);

  useEffect(() => {
    if (
      !(
        beforeSelectedDate.year() == selectedDate.year() &&
        beforeSelectedDate.month() == selectedDate.month()
      )
    ) {
      eventRepo
        .getEventTableInfoByYearAndMonthAndEventTypeForCalendar(
          moment(selectedDate).year(),
          moment(selectedDate).month() + 1,
          eventType
        )
        .then(response => {
          setEventInfoListOfMonth(response);
        })
        .catch(e => {
          alert('오류가 발생했습니다.');
        });
    } else {
      setIsModalVisible(isModalVisible == undefined ? false : true); // 맨 처음 렌더링할 때 모달을 켜지 않게 하기 위한 방편
    }

    setBeforeSelectedDate(selectedDate);
  }, [selectedDate]);

  const getListData = (date: moment.Moment): CalendarData[] => {
    return (
      eventInfoListOfMonth
        .filter(
          value =>
            moment(value.eventDate).month() == date.month() &&
            moment(value.eventDate).date() == date.date()
        )
        .map(value => {
          return {
            type: convertEventType(todayString, value.eventDate, value.eventType),
            content: value.eventName,
          } as CalendarData;
        }) || []
    );
  };

  const dateCellRender = (date: moment.Moment) => {
    const listData: CalendarData[] = getListData(date);
    return (
      <ul className="events" style={{ listStyle: 'none' }}>
        {listData.map(item => (
          <li key={item.content}>
            <Badge
              status={
                item.type as 'success' | 'processing' | 'error' | 'default' | 'warning' | undefined
              }
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {
          <div>
            {calenderType == 'eventManagement' ? (
              <EventManageComponent
                selectedDate={beforeSelectedDate}
                eventInfoListOfMonth={eventInfoListOfMonth}
                setEventInfoListOfMonth={setEventInfoListOfMonth}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              ></EventManageComponent>
            ) : (
              <></>
            )}
            {calenderType == 'lcAttendanceManagement' ? (
              <EventSelectForAttendanceCheckComponent
                selectedDate={beforeSelectedDate}
                eventInfoListOfMonth={eventInfoListOfMonth}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              ></EventSelectForAttendanceCheckComponent>
            ) : (
              <></>
            )}
            <Calendar
              value={selectedDate}
              dateCellRender={dateCellRender}
              onSelect={value => {
                setSelectedDate(value);
              }}
            />
          </div>
        }
      </Content>
    </Layout>
  );
};

export default EventCalendarComponent;
