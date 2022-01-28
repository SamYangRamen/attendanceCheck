import React, { useEffect, useState } from 'react';
import LcMemberRegisterComponent from '../connect/LcMemberRegisterComponent';
import Select from 'react-select';
import { ActionMeta } from 'react-select';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import FgGenerationSelectComponent from './FgGenerationSelectComponent';
import YearForLcSelectComponent from './YearForLcSelectComponent';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const maxGeneration = new Date().getFullYear() - 2006;
const generationUnit = 5;

const AdminComponent: React.FC = () => {
  const [nav, setNav] = useState<string>('');

  const onClick = (e: MenuInfo) => {
    setNav(nav == e.key ? '' : e.key);
  };

  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="FgMemberManagement" onClick={onClick}>
            FG 멤버 관리
          </Menu.Item>
          <Menu.Item key="LcManagement" onClick={onClick}>
            LC 관리
          </Menu.Item>
          <Menu.Item key="LcMemberManagement" onClick={onClick}>
            LC 멤버 관리
          </Menu.Item>
        </Menu>
      </Header>
      {nav == 'FgMemberManagement' ? (
        <FgGenerationSelectComponent></FgGenerationSelectComponent>
      ) : (
        <></>
      )}
      {nav == 'LcManagement' ? <YearForLcSelectComponent></YearForLcSelectComponent> : <></>}
    </Layout>
  );
};

export default AdminComponent;
