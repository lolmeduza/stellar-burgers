import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { userSelectors } from '../../services/slices/user';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(userSelectors.isAuthCheckedSelector);
  const user = useSelector(userSelectors.userDataSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            backgroundLocation: location.state?.backgroundLocation,
            state: null
          }
        }}
      />
    );
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.backgroundLocation || null;

    return <Navigate replace to={from} state={{ from: backgroundLocation }} />;
  }

  return children;
};
