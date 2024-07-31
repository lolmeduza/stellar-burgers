import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import {
  ingredientsSelector,
  ingredientsSlice
} from '../../services/slices/ingredients';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientsData = useSelector(ingredientsSelector.getIngredients);
  const params = useParams();
  const ingredientData = ingredientsData.find((item) => item._id === params.id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
