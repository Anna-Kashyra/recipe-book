"use client";

import { FC } from 'react';
import Image from "next/image";
import Link from "next/link";
import { IMeal } from "@/models/IMeal";
import { IFilteredMeal } from '@/models/IFilterOption';

interface MealCardProps {
  meal: IMeal | IFilteredMeal;
}

export const MealCard: FC<MealCardProps> = ({ meal }) => {
  return (
    <li className="border rounded-xl shadow-md p-4">
      <Link href={`/recipe/${meal.idMeal}`} className="block">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={300}
          height={200}
          className="rounded-md w-full h-48 object-cover mb-2"
        />
        <h2 className="text-xl font-medium">{meal.strMeal}</h2>
      </Link>
      <p className="text-sm text-gray-600 flex gap-2 flex-wrap">
        <Link
          href={`/recipe/category/${encodeURIComponent(meal.strCategory)}`}
          className="underline text-blue-600"
        >
          {meal.strCategory}
        </Link>
        ·
        <Link
          href={`/recipe/area/${encodeURIComponent(meal.strArea)}`}
          className="underline text-blue-600"
        >
          {meal.strArea}
        </Link>
      </p>
    </li>
  );
};