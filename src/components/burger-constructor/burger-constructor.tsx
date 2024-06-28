import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectOrderRequest,
  selectOrderModalData,
  orderBurgerThunk,
  closeOrder
} from '../../services/slices/burgerConstructor';
import { selectBurgerConstructor } from '../../services/slices/burgerConstructor';
import { selectIsAuthChecked } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectBurgerConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuthChecked) {
      return navigate('/login', { replace: true });
    }

    if (constructorItems.bun._id && !orderRequest) {
      return dispatch(
        orderBurgerThunk([
          constructorItems.bun._id,
          ...constructorItems.ingredients.map((ing) => ing._id),
          constructorItems.bun._id
        ])
      );
    }
  };
  const closeOrderModal = () => {
    dispatch(closeOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun?.price ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
