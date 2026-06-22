import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import {
  Area,
  Category,
  IMeal,
  Ingredient,
  MealDbResponse,
} from '../models/IMeal';

@Injectable()
export class RecipeService {
  private readonly baseUrl: string;
  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('RECIPE_API_BASE_URL');
    if (!url) {
      throw new Error('RECIPE_API_BASE_URL is not defined in .env');
    }
    this.baseUrl = url;
  }

  private async fetchFromApi<T>(endpoint: string) {
    try {
      const response = await axios.get<T>(`${this.baseUrl}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch data from MealDB');
    }
  }

  private async fetchDetailedMeals(
    summaryEndpoint: string,
  ): Promise<{ meals: IMeal[] }> {
    const summary = await this.fetchFromApi<{ meals: IMeal[] }>(
      summaryEndpoint,
    );
    const meals = summary.meals ?? [];
    const detailed = await Promise.all(
      meals.map(async (m) => {
        const res = await this.fetchFromApi<{ meals: IMeal[] }>(
          `/lookup.php?i=${m.idMeal}`,
        );
        return res.meals?.[0] ?? null;
      }),
    );
    return { meals: detailed.filter((m): m is IMeal => m !== null) };
  }

  async getAll(): Promise<{ meals: IMeal[] }> {
    return this.fetchFromApi(`/search.php?s=`);
  }

  async getMealsByLetter(letter: string): Promise<{ meals: IMeal[] }> {
    return this.fetchFromApi(`/search.php?f=${letter}`);
  }

  async getMealsByCategory(category: string): Promise<{ meals: IMeal[] }> {
    return this.fetchDetailedMeals(
      `/filter.php?c=${encodeURIComponent(category)}`,
    );
  }

  async getMealsByArea(area: string): Promise<{ meals: IMeal[] }> {
    return this.fetchDetailedMeals(`/filter.php?a=${encodeURIComponent(area)}`);
  }

  async getMealsByIngredient(ingredient: string): Promise<{ meals: IMeal[] }> {
    return this.fetchDetailedMeals(
      `/filter.php?i=${encodeURIComponent(ingredient)}`,
    );
  }
  async getIngredients(): Promise<MealDbResponse<Ingredient>> {
    const data =
      await this.fetchFromApi<MealDbResponse<Ingredient>>('/list.php?i=list');
    const meals = data.meals ?? [];
    const unique = meals.filter(
      (item, index, self) =>
        index === self.findIndex((i) => i.strIngredient === item.strIngredient),
    );
    return { meals: unique };
  }

  async getAreas(): Promise<MealDbResponse<Area>> {
    const data =
      await this.fetchFromApi<MealDbResponse<Area>>('/list.php?a=list');
    const meals = data.meals ?? [];
    const unique = meals.filter(
      (item, index, self) =>
        index === self.findIndex((i) => i.strArea === item.strArea),
    );
    return { meals: unique };
  }

  async getCategories(): Promise<MealDbResponse<Category>> {
    const data =
      await this.fetchFromApi<MealDbResponse<Category>>('/list.php?c=list');
    const meals = data.meals ?? [];
    const unique = meals.filter(
      (item, index, self) =>
        index === self.findIndex((i) => i.strCategory === item.strCategory),
    );
    return { meals: unique };
  }

  getByFilter(
    type: 'i' | 'a' | 'c',
    value: string,
  ): Promise<{ meals: IMeal[] }> {
    return this.fetchFromApi(`/filter.php?${type}=${value}`);
  }

  async getRecipeById(id: string): Promise<{ meals: IMeal[] }> {
    return this.fetchFromApi(`/lookup.php?i=${id}`);
  }

  async getByMultipleFilters(filters: {
    area?: string;
    category?: string;
    ingredient?: string;
  }): Promise<{ meals: IMeal[] }> {
    const requests: Promise<{ meals: IMeal[] | null }>[] = [];

    if (filters.area) {
      requests.push(
        this.fetchFromApi(`/filter.php?a=${encodeURIComponent(filters.area)}`),
      );
    }
    if (filters.category) {
      requests.push(
        this.fetchFromApi(
          `/filter.php?c=${encodeURIComponent(filters.category)}`,
        ),
      );
    }
    if (filters.ingredient) {
      requests.push(
        this.fetchFromApi(
          `/filter.php?i=${encodeURIComponent(filters.ingredient)}`,
        ),
      );
    }

    if (requests.length === 0) return { meals: [] };

    const results = await Promise.all(requests);
    const idSets = results.map(
      (r) => new Set((r.meals ?? []).map((m: IMeal) => m.idMeal)),
    );
    const commonIds = [...idSets[0]].filter((id) =>
      idSets.every((set) => set.has(id)),
    );
    const detailed = await Promise.all(
      commonIds.map(async (id) => {
        const res = await this.fetchFromApi<{ meals: IMeal[] }>(
          `/lookup.php?i=${id}`,
        );
        return res.meals?.[0] ?? null;
      }),
    );

    return { meals: detailed.filter((m): m is IMeal => m !== null) };
  }
}
