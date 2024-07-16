import {
  ConstructorPage,
  Feed,
  Login,
  NotFound404,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  Location,
  useNavigate
} from 'react-router-dom';
import { AppHeader } from '@components';
import { ProtectedRoute } from '../protected-route';
import { useDispatch } from '../../services/hooks';
import { useEffect, useState } from 'react';
import { checkUserAuth, loginUser } from '../../services/thunk/user';
import { TUserLoginBody } from '@utils-types';
import { userActions } from '../../services/slices/user';

function App() {
  const { authCheck } = userActions;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const cbLogin = (dataUser: TUserLoginBody) => {
    dispatch(loginUser(dataUser));
  };

  useEffect(() => {
    dispatch(checkUserAuth())
      .unwrap()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(authCheck()));
  }, [dispatch, authCheck]);

  const navigate = useNavigate();
  const location: Location<{ backgroundLocation: Location }> = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<ConstructorPage />} />
      </Routes>
    </div>
  );
}

export default App;
