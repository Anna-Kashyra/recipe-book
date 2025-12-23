import { notFound } from 'next/navigation';
import { IMeal } from '@/models/IMeal';

async function getMealById(id: string): Promise<IMeal | null> {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals?.[0] || null;
}

function getIngredients(meal: IMeal): string[] {
  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  return ingredients;
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const meal = await getMealById(params.id);

  if (!meal) return notFound();

  const ingredients = getIngredients(meal);

  return (
    <div className="flex flex-col gap-6 row-center-2 items-center sm:items-center max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold">{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="rounded-xl w-full max-w-lg object-cover"
      />
      <p className="text-gray-600 text-sm">
        <strong>Category:</strong> {meal.strCategory} | <strong>Area:</strong> {meal.strArea}
      </p>

      <div className="flex gap-10">
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold mt-4 mb-2">Ingredients</h2>
          <ul className="list-disc list-inside">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="w-2/3">
          <h2 className="text-2xl font-semibold mt-4 mb-2">Instructions</h2>
          <p className="whitespace-pre-line leading-relaxed">{meal.strInstructions}</p>
        </div>
      </div>

      {meal.strYoutube && (
        <div className="mt-4">
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-blue-600 underline"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
}