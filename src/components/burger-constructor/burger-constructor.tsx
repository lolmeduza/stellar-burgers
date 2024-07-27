import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/hooks';
import { constructorSelector } from '../../services/slices/burgerConstructor';
import { createOrder } from '../../services/thunk/createOrder';
import { ingredientsSelector } from '../../services/slices/ingredients';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(constructorSelector.constructorBun);
  const ingredients = useSelector(constructorSelector.constructorIngredients);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };
  const dispatch = useDispatch();
  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    let data: string[] = [];
    data.push(constructorItems.bun._id);
    ingredients.forEach((ingredient) => {
      data.push(ingredient._id);
    });
    console.log('DATA: ', data);
    dispatch(createOrder(data));
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
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
