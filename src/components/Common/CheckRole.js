import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Role } from '../../config/role';

export const CheckRole = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const { roles } = props;

  if (roles && isAuthenticated && roles.indexOf(user.role) === -1) {
    if (user.role === Role.Admin) {
      return (
        <Redirect
          to={{
            pathname: '/admin',
          }}
        />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      );
    }
  }

  return <>{props.children}</>;
};
