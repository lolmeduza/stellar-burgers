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
  const isAuthChecked = useSelector(userSelectors.isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const user = useSelector(userSelectors.userDataSelector); // userDataSelector — селектор получения пользователя из store
  const location = useLocation();

  console.log(isAuthChecked, user, location);

  if (!isAuthChecked) {
    console.log('LOADING AUTH');
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    console.log('Navigate to login');
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onlyUnAuth && user) {
    // если пользователь на странице авторизации и данные есть в хранилище
    // при обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
    // в случае если объекта location.state?.from нет — а такое может быть, если мы зашли на страницу логина по прямому URL
    // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.backgroundLocation || null;
    console.log('Navigate to ', from);
    return <Navigate replace to={from} state={{ from: backgroundLocation }} />;
  }

  return children;
};
