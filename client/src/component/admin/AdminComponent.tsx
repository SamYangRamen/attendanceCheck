import React, { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import FgGenerationSelectComponent from 'component/admin/FgGenerationSelectComponent';
import YearForLcSelectComponent from 'component/admin/YearForLcSelectComponent';
import YearForLcMemberSelectComponent from 'component/admin/YearForLcMemberSelectComponent';
import EventCalendarComponent from 'component/common/EventCalendarComponent';
import { DoubleRightOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AdminComponent: React.FC = () => {
  const [nav, setNav] = useState<string>('');
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);

  const onClick = (e: MenuInfo) => {
    setNav(nav == e.key ? '' : e.key);
  };

  return (
    <div>
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
          <Menu.Item key="FgMemberManagement" onClick={onClick}>
            FG 멤버 관리
          </Menu.Item>
          <Menu.Item key="LcManagement" onClick={onClick}>
            LC 관리
          </Menu.Item>
          <Menu.Item key="LcMemberManagement" onClick={onClick}>
            LC 멤버 관리
          </Menu.Item>
          <Menu.Item key="EventManagement" onClick={onClick}>
            행사 관리
          </Menu.Item>
        </Menu>
        {nav == 'FgMemberManagement' ? (
          <FgGenerationSelectComponent
            isDrawerVisible={isDrawerVisible}
            setIsDrawerVisible={setIsDrawerVisible}
          ></FgGenerationSelectComponent>
        ) : (
          <></>
        )}
        {nav == 'LcManagement' ? (
          <YearForLcSelectComponent
            isDrawerVisible={isDrawerVisible}
            setIsDrawerVisible={setIsDrawerVisible}
          ></YearForLcSelectComponent>
        ) : (
          <></>
        )}
        {nav == 'LcMemberManagement' ? (
          <YearForLcMemberSelectComponent
            isDrawerVisible={isDrawerVisible}
            setIsDrawerVisible={setIsDrawerVisible}
          ></YearForLcMemberSelectComponent>
        ) : (
          <></>
        )}
        {nav == 'EventManagement' ? (
          <EventCalendarComponent calenderType="eventManagement"></EventCalendarComponent>
        ) : (
          <></>
        )}
      </Layout>
    </div>
  );
};

export default AdminComponent;
