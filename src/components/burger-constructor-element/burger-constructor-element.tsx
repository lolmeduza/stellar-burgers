import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { constructorActions } from '../../services/slices/burgerConstructor';
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        constructorActions.reorderConstructor({ from: index, to: index + 1 })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        constructorActions.reorderConstructor({ from: index, to: index - 1 })
      );
    };

    const handleClose = () => {
      dispatch(constructorActions.removeFromConstructor(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
