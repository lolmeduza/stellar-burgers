import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState, ...rest }) => {
    const { image, price, name, _id } = ingredient;
    console.log(styles.addButton);
    return (
      <li className={styles.container} {...rest}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
          {...rest}
        >
          {count && <Counter count={count} />}
          <img className={styles.img} src={image} alt='картинка ингредиента.' />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        {/* <AddButton
          text='Добавить'
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
          {...rest}
          data-cy={'1'}
        /> */}
        <button
          className={`${styles.addButton} common_button mt-8`}
          type='button'
          onClick={handleAdd}
          data-cy={'1'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M12 1.68619C12.5523 1.68619 13 2.1339 13 2.68619L13 10.9999L21.3137 10.9999C21.866 10.9999 22.3137 11.4476 22.3137 11.9999C22.3137 12.5522 21.866 12.9999 21.3137 12.9999L13 12.9999L13 21.3136C13 21.8659 12.5523 22.3136 12 22.3136C11.4477 22.3136 11 21.8659 11 21.3136L11 12.9999L2.68629 12.9999C2.13401 12.9999 1.68629 12.5522 1.68629 11.9999C1.68629 11.4476 2.13401 10.9999 2.68629 10.9999L11 10.9999L11 2.68619C11 2.1339 11.4477 1.68619 12 1.68619Z'
              fill='#F2F2F3'
            />
          </svg>
          Добавить
          {/* <AddButton
            text='Добавить'
            onClick={handleAdd}
            extraClass={`${styles.addButton} mt-8`}
          /> */}
        </button>
      </li>
    );
  }
);
