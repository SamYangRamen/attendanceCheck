import React, { useState } from 'react';
import { Button, Layout, Menu, Space } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import YearForLcMemberSelectComponent from 'component/admin/YearForLcMemberSelectComponent';
import EventCalendarComponent from 'component/common/EventCalendarComponent';
import LcAttendanceCheckComponent from 'component/user/LcAttendanceCheckComponent';
import { DoubleRightOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const UserComponent: React.FC = () => {
  const [nav, setNav] = useState<string>('');
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const onClick = (e: MenuInfo) => {
    setNav(nav == e.key ? '' : e.key);
    setIsDrawerVisible(false);
  };

  return (
    <Layout>
      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        style={{ position: 'absolute', width: 54 }}
      >
        <Menu.Item
          key="openDrawerButton"
          onClick={e => {
            setIsDrawerVisible(!isDrawerVisible);
          }}
        >
          <DoubleRightOutlined />
        </Menu.Item>
      </Menu>
      <Menu theme="dark" mode="horizontal" selectable={true} style={{ marginLeft: 54 }}>
        <Menu.Item key="LcMemberManagement" onClick={onClick}>
          LC 멤버 관리
        </Menu.Item>
        <Menu.Item key="LcAttendanceCheck" onClick={onClick}>
          LC 출석 체크
        </Menu.Item>
        <Menu.Item key="LcAttendanceManagement" onClick={onClick}>
          LC 출결 관리
        </Menu.Item>
      </Menu>
      <Content>
        {nav == 'LcMemberManagement' ? (
          <YearForLcMemberSelectComponent
            isDrawerVisible={isDrawerVisible}
            setIsDrawerVisible={setIsDrawerVisible}
          ></YearForLcMemberSelectComponent>
        ) : (
          <></>
        )}
        {nav == 'LcAttendanceCheck' ? (
          <LcAttendanceCheckComponent></LcAttendanceCheckComponent>
        ) : (
          <></>
        )}
        {nav == 'LcAttendanceManagement' ? (
          <EventCalendarComponent calenderType="lcAttendanceManagement"></EventCalendarComponent>
        ) : (
          <></>
        )}
      </Content>
    </Layout>
  );
};

export default UserComponent;
