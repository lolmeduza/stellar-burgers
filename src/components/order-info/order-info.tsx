import { FC, useEffect, useLayoutEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { ordersSelector } from '../../services/slices/orders';
import { useDispatch, useSelector } from '../../services/hooks';
import { constructorSelector } from '../../services/slices/burgerConstructor';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../services/thunk/order';
import { singleOrderSelector } from '../../services/slices/order';
import { getIngredients } from '../../services/thunk/ingredients';
import { ingredientsSelector } from '../../services/slices/ingredients';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  // const orderData = {
  //   createdAt: '',
  //   ingredients: [],
  //   _id: '',
  //   status: '',
  //   name: '',
  //   updatedAt: 'string',
  //   number: 0
  // };
  const dispatch = useDispatch();
  const params = useParams();
  const orderNumber = Number(params.number);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getOrder(orderNumber));
  }, [dispatch]);

  const orderData = useSelector(singleOrderSelector.getSingleOrder);
  const ingredients = useSelector(ingredientsSelector.getIngredients);

  const objectBurger = orderData.find((item) => item.number === orderNumber);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !objectBurger || !ingredients.length) return null;

    const date = new Date(objectBurger.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = objectBurger.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...objectBurger,
      ingredientsInfo,
      date,
      total
    };
  }, [objectBurger, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
