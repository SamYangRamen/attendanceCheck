import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import HomeComponent from './HomeComponent';
import AdminComponent from './admin/AdminComponent';
import LoginComponent from './connect/LoginComponent';
import RegisterComponent from './connect/RegisterComponent';
import UserComponent from './user/UserComponent';
import LogoutComponent from './connect/LogoutComponent';
import RootStore from '../store/RootStore';
import ValueStore from '../store/ValueStore';
import StoreProvider from '../store/StoreProvider';
import RepositoryStore from '../store/RepositoryStore';

const RootComponent: React.FC = () => {
  const [store] = useState<RootStore>({
    valueStore: new ValueStore(),
    repositoryStore: new RepositoryStore(),
  });

  return (
    <div>
      <StoreProvider value={store}>
        <Switch>
          <Route path="/login" component={LoginComponent} />
          <Route path="/register" component={RegisterComponent} />
          <Route path="/logout" component={LogoutComponent} />
          <Route path="/admin" component={AdminComponent} />
          <Route path="/user" component={UserComponent} />
          <Route path="/" exact component={HomeComponent} />
        </Switch>
      </StoreProvider>
    </div>
  );
};

export default RootComponent;
