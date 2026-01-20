"use client";
import { useEffect, useState } from "react";
import { IMeal } from "@/models/IMeal";
import { MealCard } from "@/components/MealCard";

interface Props {
  params: { area: string };
}

async function fetchMealsByCategory(area: string): Promise<IMeal[]> {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const data = await res.json();
  const detailed = await Promise.all(
    data.meals.map(async (m: any) => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`);
      const mealData = await res.json();
      return mealData.meals[0];
    })
  );
  return detailed;
}

export default function AreaPage({ params }: Props) {
  const [meals, setMeals] = useState<IMeal[]>([]);

  useEffect(() => {
    fetchMealsByCategory(params.area).then(setMeals);
  }, [params.area]);

  return (
    <section className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-2xl font-bold">Area: {params.area}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </ul>
    </section>
  );
}
