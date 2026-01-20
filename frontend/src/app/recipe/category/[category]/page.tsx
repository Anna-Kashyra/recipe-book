import { IMeal } from "@/models/IMeal";
import { MealCard } from "@/components/MealCard";

interface Props {
  params: Promise<{ category: string }>;
}

async function fetchMealsByCategory(category: string): Promise<IMeal[]> {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`,
    { cache: "no-store" }
  );
  const data = await res.json();

  return await Promise.all(
    data.meals.map(async (m: any) => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`);
      const mealData = await res.json();
      return mealData.meals[0];
    })
  );
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const meals = await fetchMealsByCategory(category);

  return (
    <section className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-2xl font-bold">Category: {category}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </ul>
    </section>
  );
}
