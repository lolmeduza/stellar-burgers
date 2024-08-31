import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/hooks';
import {
  constructorSelector,
  constructorReducer,
  constructorActions
} from '../../services/slices/burgerConstructor';
import {
  TNewOrderResponse,
  createOrder
} from '../../services/thunk/createOrder';
import { userSelectors } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(constructorSelector.constructorBun);
  const ingredients = useSelector(constructorSelector.constructorIngredients);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.userDataSelector);
  const navigate = useNavigate();
  const [orderRequest, setOrderRequest] = useState<boolean>(false);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;
    let data: string[] = [];
    data.push(constructorItems.bun._id);
    ingredients.forEach((ingredient) => {
      data.push(ingredient._id);
    });

    if (!user) {
      navigate('/login');
    } else {
      setOrderRequest(true);

      const response = await dispatch(createOrder(data));
      const orderResponse = response.payload as TNewOrderResponse;

      setOrderModalData(orderResponse.order);

      setOrderRequest(false);
    }
  };
  const closeOrderModal = () => {
    setOrderModalData(null);
    dispatch(constructorActions.resetConstructor());
  };

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
