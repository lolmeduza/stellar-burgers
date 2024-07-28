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
import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route';
import { useDispatch } from '../../services/hooks';
import { useEffect, useState } from 'react';
import {
  checkUserAuth,
  loginUser,
  registerUser
} from '../../services/thunk/user';
import { TUserLoginBody, TUserRegisterBody } from '@utils-types';
import { userActions } from '../../services/slices/user';
import { getIngredients } from '../../services/thunk/ingredients';
import { getFeed } from '../../services/thunk/feed';

function App() {
  const { authCheck } = userActions;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const cbLogin = (dataUser: TUserLoginBody) => {
    dispatch(loginUser(dataUser));
  };

  const cbRegister = (dataUser: TUserRegisterBody) => {
    dispatch(registerUser(dataUser));
  };

  useEffect(() => {
    dispatch(checkUserAuth())
      .unwrap()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(authCheck()));
    dispatch(getIngredients());
  }, [dispatch]);

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
            <ProtectedRoute onlyUnAuth>
              <Login onLogin={cbLogin} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register onRegister={cbRegister} />
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
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
