import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import FgGenerationSelectComponent from 'component/admin/FgGenerationSelectComponent';
import YearForLcSelectComponent from 'component/admin/YearForLcSelectComponent';
import YearForLcMemberSelectComponent from 'component/admin/YearForLcMemberSelectComponent';
import EventCalendarComponent from 'component/common/EventCalendarComponent';
import { DoubleRightOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const maxGeneration = new Date().getFullYear() - 2006;
const generationUnit = 5;

const AdminComponent: React.FC = () => {
  const [nav, setNav] = useState<string>('');
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);

  const onClick = (e: MenuInfo) => {
    setNav(nav == e.key ? '' : e.key);
  };

  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item>
            <DoubleRightOutlined
              onClick={e => {
                setIsDrawerVisible(!isDrawerVisible);
              }}
            />
          </Menu.Item>
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
      </Header>
      {nav == 'FgMemberManagement' ? (
        <FgGenerationSelectComponent></FgGenerationSelectComponent>
      ) : (
        <></>
      )}
      {nav == 'LcManagement' ? <YearForLcSelectComponent></YearForLcSelectComponent> : <></>}
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
  );
};

export default AdminComponent;
