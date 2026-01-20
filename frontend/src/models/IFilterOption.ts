export interface IFilterOption {
  strIngredient?: string;
  strArea?: string;
  strCategory?: string;
}

export interface IFilteredMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}