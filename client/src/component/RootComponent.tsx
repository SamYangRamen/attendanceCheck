import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import HomeComponent from './HomeComponent';
import AdminComponent from './admin/AdminComponent';
import LoginComponent from './connect/LoginComponent';
import FgMemberRegisterComponent from './connect/FgMemberRegisterComponent';
import UserComponent from './user/UserComponent';
import LogoutComponent from './connect/LogoutComponent';
import RootStore from '../store/RootStore';
import ValueStore from '../store/ValueStore';
import StoreProvider from '../store/StoreProvider';
import RepositoryStore from '../store/RepositoryStore';
import TestComponent from './admin/AdminComponent';

import { Layout, Menu } from 'antd';
import FgMemberTableCompnent from './admin/FgMemberTableComponent';
import FgMemberAddComponent from './admin/FgMemberAddComponent';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

const RootComponent: React.FC = () => {
  const [store] = useState<RootStore>({
    valueStore: new ValueStore(),
    repositoryStore: new RepositoryStore(),
  });

  return (
    <div>
      <StoreProvider value={store}>
        <Switch>
          <Route path="/test" component={FgMemberAddComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/register" component={FgMemberRegisterComponent} />
          <Route path="/logout" component={LogoutComponent} />
          <Route path="/admin" component={AdminComponent} />
          <Route path="/user" component={UserComponent} />
          <Route path="/" exact component={HomeComponent} />
          <Route path="/test2" component={FgMemberTableCompnent} />
        </Switch>
      </StoreProvider>
    </div>
  );
};

export default RootComponent;
