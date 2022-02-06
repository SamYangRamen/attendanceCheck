import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useState } from 'react';
import LcTableComponent from 'component/admin/LcTableComponent';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const maxYear = new Date().getFullYear();
const yearUnit = 10;

const YearForLcSelectComponent: React.FC = () => {
  const [year, setYear] = useState<number>(-1);

  const onClick = (e: MenuInfo) => {
    setYear(parseInt(e.key));
  };

  const generationList: JSX.Element[] = Array.from(
    { length: (maxYear - 2000) / yearUnit + 1 },
    (_, i) => (
      <SubMenu
        key={`${maxYear - (2022 - 2000) + yearUnit * i + 1}-${
          maxYear - (2022 - 2000) + yearUnit * (i + 1)
        }`}
        icon={<UserOutlined />}
        title={`${maxYear - (2022 - 2000) + yearUnit * i + 1} ~ ${
          maxYear - (2022 - 2000) + yearUnit * (i + 1)
        }`}
      >
        {Array.from(
          {
            length:
              maxYear - 2000 - (i + 1) * yearUnit > 0 ? yearUnit : maxYear - 2000 - i * yearUnit,
          },
          (_, j) => (
            <Menu.Item key={`${maxYear - (2022 - 2000) + i * yearUnit + j + 1}`} onClick={onClick}>
              {maxYear - (2022 - 2000) + i * yearUnit + j + 1}년
            </Menu.Item>
          )
        )}
      </SubMenu>
    )
  );

  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          //defaultSelectedKeys={['']}
          //defaultOpenKeys={['1-5']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key={0} onClick={onClick}>
            전체
          </Menu.Item>
          {generationList}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {<LcTableComponent year={year} />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default YearForLcSelectComponent;
