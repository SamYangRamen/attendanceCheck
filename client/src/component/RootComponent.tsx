import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import HomeComponent from './home/HomeComponent';
import AdminComponent from './admin/AdminComponent';
import FgMemberRegisterComponent from './home/FgMemberRegisterComponent';
import UserComponent from './user/UserComponent';
import RootStore from '../store/RootStore';
import ValueStore from '../store/ValueStore';
import StoreProvider from '../store/StoreProvider';
import RepositoryStore from '../store/RepositoryStore';
import 'scss/base.scss';
import { Layout, Menu } from 'antd';
import FgMemberTableCompnent from './admin/FgMemberTableComponent';
import EventCalendarComponent from './common/EventCalendarComponent';
import TestComponent from './TestComponent';

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
          <Route path="/test" component={TestComponent} />
          <Route path="/register" component={FgMemberRegisterComponent} />
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
