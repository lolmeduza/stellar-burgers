import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { ordersSelector } from '../../services/slices/orders';
import { getOrders } from '../../services/thunk/orders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orders = useSelector(ordersSelector.getOrders);
  return <ProfileOrdersUI orders={orders} />;
};
