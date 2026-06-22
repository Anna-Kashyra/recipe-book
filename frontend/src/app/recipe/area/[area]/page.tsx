import { API_BASE_URL } from '@/lib/api';
import { IMeal } from '@/models/IMeal';
import { MealCard } from "@/components/MealCard";

interface Props {
  params: Promise<{ area: string }>;
}

async function fetchMealsByArea(area: string): Promise<IMeal[]> {
  const res = await fetch(
    `${API_BASE_URL}/recipe/get-by-area?a=${encodeURIComponent(area)}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.meals ?? [];
}

export default async function AreaPage({ params }: Props) {
  const { area } = await params;
  const meals = await fetchMealsByArea(decodeURIComponent(area));

  return (
    <section className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl text-center font-bold">Area: {decodeURIComponent(area)}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </ul>
    </section>
  );
}
