import { FC } from 'react';
import Image from 'next/image';
import Link from "next/link";

type SingleMealProps = {
  mealTitle: string;
  mealThumb: string;
  mealThumbAlt: string;
  mealCategory: string;
  mealArea: string;
  mealIngredients: string[];
  mealInstructions: string;
  mealYoutube: string;
}

export const SingleMeal: FC<SingleMealProps> = ( {mealTitle, mealThumb, mealThumbAlt, mealCategory, mealArea, mealIngredients, mealInstructions, mealYoutube} ) => {
  return (
    <div className="flex flex-col gap-6 row-center-2 items-center sm:items-center max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold">{mealTitle}</h1>
      <Image
        src={mealThumb}
        alt={mealThumbAlt}
        width={300}
        height={200}
        priority
        className="rounded-xl w-full max-w-lg object-cover"
      />
      <p className="text-gray-600 text-sm flex gap-2 flex-wrap items-center">
        <strong>Category:</strong>
        <Link
          href={`/recipe/category/${encodeURIComponent(mealCategory)}`}
          className="text-blue-600 underline hover:no-underline"
        >
          {mealCategory}
        </Link>

        <span>|</span>

        <strong>Area:</strong>
        <Link
          href={`/recipe/area/${encodeURIComponent(mealArea)}`}
          className="text-blue-600 underline hover:no-underline"
        >
          {mealArea}
        </Link>
      </p>

      <div className="flex gap-10">
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold mt-4 mb-2">Ingredients</h2>
          <ul className="list-disc list-inside">
            {mealIngredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="w-2/3">
          <h2 className="text-2xl font-semibold mt-4 mb-2">Instructions</h2>
          <p className="whitespace-pre-line leading-relaxed">{mealInstructions}</p>
        </div>
      </div>

      {mealYoutube && (
        <div className="mt-4">
          <a
            href={mealYoutube}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-lg text-blue-600 underline"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  )
}