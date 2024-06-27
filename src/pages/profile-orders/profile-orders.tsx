import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersThunk } from '../../services/slices/order';
import { selectOrders } from '../../services/slices/order';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
