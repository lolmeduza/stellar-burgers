import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/hooks';
import { userSelectors } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelectors.userName);
  return <AppHeaderUI userName={userName} />;
};
