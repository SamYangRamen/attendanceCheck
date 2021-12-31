import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LcMemberRegisterComponent from '../connect/LcMemberRegisterComponent';
import FgMemberManageComponent from './FgMemberManageComponent';
import FgMemberTableComponent from './FgMemberTableComponent';
import LcManageComponent from './LcManageComponent';
import LcTableComponent from './LcTableComponent';
import { Route, Switch } from 'react-router';

const AdminComponent: React.FC = () => {
  const [buttonFlag, setButtonFlag] = useState<string>('');

  /*
  useEffect(() => {
    for (let i = 0; i < new Date().getFullYear() - 2006; i++) {
      yearList.push(<div onClick={onClick}>{i + 1}</div>);
    }
  }, []);


  const onClsick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.textContent) setGeneration(parseInt(e.currentTarget.textContent));
  };
*/

  return (
    <div>
      <Link to="/admin/fgMemberManage">
        <input type="button" name="fgMemberManage" value="FG 멤버 관리" />
      </Link>
      <Link to="/admin/lcManage">
        <input type="button" name="lcManage" value="LC 관리" />
      </Link>
      <Switch>
        <Route path="/admin/fgMemberManage" component={FgMemberManageComponent} />
        <Route path="/admin/lcManage" component={LcManageComponent} />
      </Switch>
    </div>
  );
};

export default AdminComponent;
