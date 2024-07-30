import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/hooks';
import { feedSelector } from '../../services/slices/feed';
import { FeedInfoUIProps } from '../ui/feed-info/type';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(feedSelector.getOrders);

  const feed = {
    total: useSelector(feedSelector.getTotal),
    totalToday: useSelector(feedSelector.getTotalToday)
  };
  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      pendingOrders={pendingOrders}
      readyOrders={readyOrders}
      feed={feed}
    />
  );
};
