import { API_BASE_URL } from '@/lib/api';
import { IMeal } from '@/models/IMeal';
import { MealCard } from "@/components/MealCard";

interface Props {
  params: Promise<{ category: string }>;
}

async function fetchMealsByCategory(category: string): Promise<IMeal[]> {
  const res = await fetch(
    `${API_BASE_URL}/recipe/get-by-category?c=${encodeURIComponent(category)}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.meals ?? [];
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const meals = await fetchMealsByCategory(decodeURIComponent(category));

  return (
    <section className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl text-center font-bold">Category: {decodeURIComponent(category)}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </ul>
    </section>
  );
}
