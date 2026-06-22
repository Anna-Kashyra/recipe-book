"use client";

import { API_BASE_URL } from '@/lib/api';
import { IMeal } from '@/models/IMeal';
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

async function getMealsByLetter(letter: string): Promise<IMeal[]> {
  const res = await fetch(`${API_BASE_URL}/recipe/get-by-letter?f=${letter}`);
  const data = await res.json();
  return data.meals || [];
}

async function fetchMealsByMultiFilter(filters: {
  area?: string;
  category?: string;
  ingredient?: string;
}): Promise<IMeal[]> {
  const params = new URLSearchParams();
  if (filters.area) params.set('area', filters.area);
  if (filters.category) params.set('category', filters.category);
  if (filters.ingredient) params.set('ingredient', filters.ingredient);

  const res = await fetch(`${API_BASE_URL}/recipe/multi-filter?${params}`);
  const data = await res.json();
  return data.meals || [];
}

export default function RecipeListPage() {
  const [selectedLetter, setSelectedLetter] = useState<string>('a');
  const [meals, setMeals] = useState<IMeal[]>([]);

  const [filteredMeals, setFilteredMeals] = useState<IMeal[]>([]);
  const [ingredients, setIngredients] = useState<IFilterOption[]>([]);
  const [areas, setAreas] = useState<IFilterOption[]>([]);
  const [categories, setCategories] = useState<IFilterOption[]>([]);
  const [ingredientValue, setIngredientValue] = useState<string>("");
  const [areaValue, setAreaValue] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<{
    area?: string;
    category?: string;
    ingredient?: string;
  } | null>(null);

  const hasActiveFilter = activeFilter && (
    activeFilter.area || activeFilter.category || activeFilter.ingredient
  );
  const displayedMeals = hasActiveFilter ? filteredMeals : meals;

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
    fetchList( `${API_BASE_URL}/recipe/ingredients`).then(
      setIngredients
    );
    fetchList(`${API_BASE_URL}/recipe/areas`).then(
      setAreas
    );
    fetchList(`${API_BASE_URL}/recipe/categories`).then(
      setCategories
    );
  }, []);

  // fetch meals by active filter
  useEffect(() => {
    if (!activeFilter) return;
    fetchMealsByMultiFilter(activeFilter).then(setFilteredMeals);
  }, [activeFilter]);

  return (
    <section className="flex flex-col justify-center items-center gap-9">
      <h1 className="text-2xl font-bold">
        {hasActiveFilter
          ? `Recipe List by ${[
            activeFilter.area && `Area: ${activeFilter.area}`,
            activeFilter.category && `Category: ${activeFilter.category}`,
            activeFilter.ingredient && `Ingredient: ${activeFilter.ingredient}`,
          ].filter(Boolean).join(' + ')}`
          : "All Recipe List"}
      </h1>

      {!hasActiveFilter && (
        <LetterToggle selectedLetter={selectedLetter} onSelectLetter={setSelectedLetter} />
      )}

      {/* FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center gap-4 w-full max-w-4xl">
        {/* Ingredient */}
        <Select
          value={ingredientValue}
          onValueChange={(v) => {
            setIngredientValue(v);
            setActiveFilter(prev => ({ ...prev, ingredient: v }));
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
            setActiveFilter(prev => ({ ...prev, area: v }));
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
            setActiveFilter(prev => ({ ...prev, category: v }));
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
      {hasActiveFilter && (
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
        {displayedMeals.map((meal: IMeal ) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </ul>
    </section>
  )
}