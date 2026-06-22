"use client";

import { IMeal } from '@/models/IMeal';
import { IFilteredMeal } from "@/models/IFilterOption";
import { IFilterOption } from "@/models/IFilterOption";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from 'react';
import { LetterToggle } from '@/components/LetterToggle';
import { MealCard } from '@/components/MealCard';

async function fetchList(endpoint: string) {
  const res = await fetch(endpoint);
  const data = await res.json();
  return data.meals || [];
}

async function fetchMealsByFilter(
  type: "i" | "a" | "c",
  value: string
): Promise<IFilteredMeal[]> {
  const res = await fetch(
    `http://localhost:5000/recipe/filter?type=${type}&value=${encodeURIComponent(value)}`
  );
  const data = await res.json();
  return data.meals || [];
}
async function getMealsByLetter(letter: string): Promise<IMeal[]> {
  const res = await fetch(`http://localhost:5000/recipe/get-by-letter?f=${letter}`);
  const data = await res.json();
  return data.meals || [];
}

function getFilterLabel(filter: { type: "i" | "a" | "c"; value: string }) {
  switch (filter.type) {
    case "i":
      return `Ingredient: ${filter.value}`;
    case "a":
      return `Area: ${filter.value}`;
    case "c":
      return `Category: ${filter.value}`;
    default:
      return filter.value;
  }
}

export default function RecipeListPage() {
  const [selectedLetter, setSelectedLetter] = useState<string>('a');
  const [meals, setMeals] = useState<IMeal[]>([]);

  const [filteredMeals, setFilteredMeals] = useState<IFilteredMeal[]>([]);
  const [ingredients, setIngredients] = useState<IFilterOption[]>([]);
  const [areas, setAreas] = useState<IFilterOption[]>([]);
  const [categories, setCategories] = useState<IFilterOption[]>([]);
  const [ingredientValue, setIngredientValue] = useState<string>("");
  const [areaValue, setAreaValue] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<
    { type: "i" | "a" | "c"; value: string } | null
  >(null);

  const displayedMeals = activeFilter ? filteredMeals : meals;

  // fetch meals by letter
  useEffect(() => {
    async function fetchMeals() {
      const fetchedMeals = await getMealsByLetter(selectedLetter);
      setMeals(fetchedMeals);
    }

    fetchMeals();
  }, [selectedLetter]);

  // fetch ingredients, area and categories
  useEffect(() => {
    fetchList("http://localhost:5000/recipe/ingredients").then(
      setIngredients
    );
    fetchList("http://localhost:5000/recipe/areas").then(
      setAreas
    );
    fetchList("http://localhost:5000/recipe/categories").then(
      setCategories
    );
  }, []);

  // fetch meals by active filter
  useEffect(() => {
    if (!activeFilter) return;

    fetchMealsByFilter(activeFilter.type, activeFilter.value).then(async (data) => {
      const detailedMeals = await Promise.all(
        data.map(async (m) => {
          const res = await fetch(`http://localhost:5000/recipe/${m.idMeal}`);
          const mealData = await res.json();
          return mealData.meals[0];
        })
      );
      setFilteredMeals(detailedMeals);
    });
  }, [activeFilter]);

  return (
    <section className="flex flex-col justify-center items-center gap-9">
      <h1 className="text-2xl font-bold">
        {activeFilter
          ? `Recipe List by ${getFilterLabel(activeFilter)}`
          : "All Recipe List"}
      </h1>

      {!activeFilter && (
        <LetterToggle selectedLetter={selectedLetter} onSelectLetter={setSelectedLetter} />
      )}

      {/* FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center gap-4 w-full max-w-4xl">
        {/* Ingredient */}
        <Select
          value={ingredientValue}
          onValueChange={(v) => {
            setIngredientValue(v);
            setActiveFilter({ type: "i", value: v });
            setAreaValue("");
            setCategoryValue("");
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Ingredient" />
          </SelectTrigger>
          <SelectContent>
            {ingredients.map((item) => (
              <SelectItem
                key={item.strIngredient}
                value={item.strIngredient!}
              >
                {item.strIngredient}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Area */}
        <Select
          value={areaValue}
          onValueChange={(v) => {
            setAreaValue(v);
            setActiveFilter({ type: "a", value: v });
            setIngredientValue("");
            setCategoryValue("");
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Area" />
          </SelectTrigger>
          <SelectContent>
            {areas.map((item) => (
              <SelectItem key={item.strArea} value={item.strArea!}>
                {item.strArea}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category */}
        <Select
          value={categoryValue}
          onValueChange={(v) => {
            setCategoryValue(v);
            setActiveFilter({ type: "c", value: v });
            setIngredientValue("");
            setAreaValue("");
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((item) => (
              <SelectItem
                key={item.strCategory}
                value={item.strCategory!}
              >
                {item.strCategory}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Reset button */}
      {activeFilter && (
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => {
            setActiveFilter(null);
            setFilteredMeals([]);
            setIngredientValue("");
            setAreaValue("");
            setCategoryValue("");
          }}
        >
          Reset Filters
        </button>
      )
      }

      {/* Meals List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {displayedMeals.map((meal: IMeal | IFilteredMeal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </ul>
    </section>
  )
}