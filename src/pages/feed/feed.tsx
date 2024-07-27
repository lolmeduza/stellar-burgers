import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from '../../services/hooks';
import { feedSelector } from '../../services/slices/feed';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(feedSelector.getOrders);
  console.log('ORDERS', orders);
  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
