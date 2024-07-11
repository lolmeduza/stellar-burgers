import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { userDataSelector, isAuthCheckedSelector } from '../Slices/userSlice';
type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

// export function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
//   const location = useLocation();
//   const { getAuthCheck, getUser } = userSelectors;
//   const user = useSelector(getUser);
//   const isAuthCheck = useSelector(getAuthCheck);

//   if (!isAuthCheck) {
//     return <Preloader />;
//   }
// }

// if (onlyUnAuth&&user){
//     const from = location.state?.from||{pathname:'/'
//     }
// }

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const user = useSelector(userDataSelector); // userDataSelector — селектор получения пользователя из store
  const location = useLocation();

  if (!isAuthChecked) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onlyUnAuth && user) {
    // если пользователь на странице авторизации и данные есть в хранилище
    // при обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
    // в случае если объекта location.state?.from нет — а такое может быть, если мы зашли на страницу логина по прямому URL
    // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
