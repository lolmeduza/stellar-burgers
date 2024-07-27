import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from '../../services/hooks';
import { ordersSelector } from '../../services/slices/orders';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(ordersSelector.getOrders);
  return <ProfileOrdersUI orders={orders} />;
};
