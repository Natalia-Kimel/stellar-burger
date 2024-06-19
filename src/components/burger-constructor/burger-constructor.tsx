import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import {
  selectOrderRequest,
  selectOrderModalData,
  orderBurgerThunk
} from '../../services/slices/stellarBurgerSlice';
import { selectBurgerConstructor } from '../../services/slices/burgerConstructor';
import { getIngredientsThunk, selectIngredients } from '../../services/slices/ingredients';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectBurgerConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const ingredients = useSelector(selectIngredients);
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (constructorItems.bun._id && !orderRequest) {
    return (dispatch(orderBurgerThunk([
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ing) => ing._id),
      constructorItems.bun._id
    ]))
    )}
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun?.price ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredientsThunk());
    }
  }, [dispatch]);

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
