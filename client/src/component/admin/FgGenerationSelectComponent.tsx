import { Drawer, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useEffect, useState } from 'react';
import FgMemberTableCompnent from 'component/admin/FgMemberTableComponent';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const maxGeneration = new Date().getFullYear() - 2006;
const generationUnit = 5;

interface Props {
  isDrawerVisible: boolean;
  setIsDrawerVisible: (value: React.SetStateAction<boolean>) => void;
}

const FgGenerationSelectComponent: React.FC<Props> = ({
  isDrawerVisible,
  setIsDrawerVisible,
}: Props) => {
  const [generation, setGeneration] = useState<number>(-1);

  const onClick = (e: MenuInfo) => {
    setGeneration(parseInt(e.key));
  };

  const generationList: JSX.Element[] = Array.from(
    { length: maxGeneration / generationUnit + 1 },
    (_, i) => (
      <SubMenu
        key={`${i * generationUnit + 1}-${(i + 1) * generationUnit}`}
        icon={<UserOutlined />}
        title={`${i * generationUnit + 1} ~ ${(i + 1) * generationUnit}기`}
      >
        {Array.from(
          {
            length:
              maxGeneration - (i + 1) * generationUnit > 0
                ? generationUnit
                : maxGeneration - i * generationUnit,
          },
          (_, j) => (
            <Menu.Item key={`${i * generationUnit + j + 1}`} onClick={onClick}>
              {i * generationUnit + j + 1}기 ({maxGeneration + 1991 + i * generationUnit + j})
            </Menu.Item>
          )
        )}
      </SubMenu>
    )
  );

  return (
    <Layout>
      <Drawer
        className="drawer"
        visible={isDrawerVisible}
        placement="left"
        onClose={e => {
          setIsDrawerVisible(false);
        }}
        width={'250'}
      >
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
      </Drawer>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <FgMemberTableCompnent generation={generation} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default FgGenerationSelectComponent;
