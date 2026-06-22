import { API_BASE_URL } from '@/lib/api';
import { notFound } from 'next/navigation';
import { IMeal } from '@/models/IMeal';
import { SingleMeal } from '@/components/SingleMeal';

async function getMealById(id: string): Promise<IMeal | null> {
  const res = await fetch(`${API_BASE_URL}/recipe/${id}`);
  const data = await res.json();
  return data.meals?.[0] || null;
}

function getIngredients(meal: IMeal): string[] {
  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  return ingredients;
}

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const meal = await getMealById(id);

  if (!meal) return notFound();

  return (
    <SingleMeal
      mealTitle={meal.strMeal}
      mealThumb={meal.strMealThumb}
      mealThumbAlt={meal.strMeal}
      mealCategory={meal.strCategory}
      mealArea={meal.strArea}
      mealIngredients={getIngredients(meal)}
      mealInstructions={meal.strInstructions}
      mealYoutube={meal.strYoutube}
    />
  );
}