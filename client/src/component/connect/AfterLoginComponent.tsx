import { RouteComponentProps } from 'react-router';

const AfterLoginComponent: React.FC<RouteComponentProps> = ({ location, history }) => {
  const { isAdmin: isAdmin } = location.state as {
    isAdmin: boolean;
  };

  alert(isAdmin);
  return <></>;
};

export default AfterLoginComponent;
