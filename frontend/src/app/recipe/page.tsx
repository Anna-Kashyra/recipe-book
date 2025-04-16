"use client";

import Link from 'next/link';
import { IMeal } from '@/models/IMeal';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useEffect, useState } from 'react';

async function getMealsByLetter(letter: string): Promise<IMeal[]> {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await res.json();
  return data.meals || [];
}

export default function RecipeListPage() {
  const [selectedLetter, setSelectedLetter] = useState<string>('a');
  const [meals, setMeals] = useState<IMeal[]>([]);

  useEffect(() => {
    async function fetchMeals() {
      const fetchedMeals = await getMealsByLetter(selectedLetter);
      setMeals(fetchedMeals);
    }

    fetchMeals();
  }, [selectedLetter]);

  return (
    <main className="flex flex-col gap-[32px] items-center">
      <h1 className="text-2xl font-bold">Recipe List</h1>

      <ToggleGroup type="single" value={selectedLetter} onValueChange={setSelectedLetter}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
        <ToggleGroupItem value="d">D</ToggleGroupItem>
        <ToggleGroupItem value="e">E</ToggleGroupItem>
        <ToggleGroupItem value="f">F</ToggleGroupItem>
        <ToggleGroupItem value="g">G</ToggleGroupItem>
        <ToggleGroupItem value="h">H</ToggleGroupItem>
        <ToggleGroupItem value="i">I</ToggleGroupItem>
        <ToggleGroupItem value="j">J</ToggleGroupItem>
        <ToggleGroupItem value="k">K</ToggleGroupItem>
        <ToggleGroupItem value="l">L</ToggleGroupItem>
        <ToggleGroupItem value="m">M</ToggleGroupItem>
        <ToggleGroupItem value="n">N</ToggleGroupItem>
        <ToggleGroupItem value="o">O</ToggleGroupItem>
        <ToggleGroupItem value="p">P</ToggleGroupItem>
        <ToggleGroupItem value="q">Q</ToggleGroupItem>
        <ToggleGroupItem value="r">R</ToggleGroupItem>
        <ToggleGroupItem value="s">S</ToggleGroupItem>
        <ToggleGroupItem value="t">T</ToggleGroupItem>
        <ToggleGroupItem value="u">U</ToggleGroupItem>
        <ToggleGroupItem value="v">V</ToggleGroupItem>
        <ToggleGroupItem value="w">W</ToggleGroupItem>
        <ToggleGroupItem value="x">X</ToggleGroupItem>
        <ToggleGroupItem value="y">Y</ToggleGroupItem>
        <ToggleGroupItem value="z">Z</ToggleGroupItem>
      </ToggleGroup>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {meals.map((meal: IMeal) => (
          <li key={meal.idMeal} className="border rounded-xl shadow-md p-4">
            <Link href={`/recipe/${meal.idMeal}`} className="block">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded-md w-full h-48 object-cover mb-2"
              />
              <h2 className="text-xl font-medium">{meal.strMeal}</h2>
              <p className="text-sm text-gray-600">{meal.strCategory} · {meal.strArea}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}