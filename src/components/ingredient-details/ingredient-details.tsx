import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '../../services/slices/ingredients';

export const IngredientDetails: FC = () => {
  const params = useParams();

  /** TODO: взять переменную из стора */
  const ingredients = useSelector(selectIngredients);
  const ingredientData = ingredients.find((ing) => ing._id === params.id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
