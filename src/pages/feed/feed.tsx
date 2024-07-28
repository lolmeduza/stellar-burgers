import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { feedSelector } from '../../services/slices/feed';
import { getFeed } from '../../services/thunk/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);
  /** TODO: взять переменную из стора */
  const orders = useSelector(feedSelector.getOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
