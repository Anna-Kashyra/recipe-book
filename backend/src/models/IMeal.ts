export interface IMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags: string;
  strYoutube: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

export interface IMealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDbResponse<T> {
  meals: T[] | null;
}

export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strThumb: string;
  strType: string | null;
}

export interface Area {
  strArea: string;
}

export interface Category {
  strCategory: string;
}
