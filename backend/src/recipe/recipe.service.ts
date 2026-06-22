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
    // this.baseUrl = this.configService.get<string>('RECIPE_API_BASE_URL')!;
    this.baseUrl = `https://www.themealdb.com/api/json/v1/1`;
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

  async getAll(): Promise<{ meals: IMeal[] }> {
    return this.fetchFromApi(`/search.php?s=`);
  }

  async getMealsByLetter(letter: string): Promise<{ meals: IMeal[] }> {
    return this.fetchFromApi(`/search.php?f=${letter}`);
  }

  async getMealsByCategory(category: string): Promise<{ meals: IMeal[] }> {
    return this.fetchFromApi(`/filter.php?c=${encodeURIComponent(category)}`);
  }

  async getMealsByArea(area: string): Promise<{ meals: IMeal[] }> {
    return this.fetchFromApi(`/filter.php?a=${encodeURIComponent(area)}`);
  }

  async getMealsByIngredient(ingredient: string): Promise<{ meals: IMeal[] }> {
    return this.fetchFromApi(`/filter.php?i=${encodeURIComponent(ingredient)}`);
  }

  async getIngredients(): Promise<MealDbResponse<Ingredient>> {
    return this.fetchFromApi<MealDbResponse<Ingredient>>('/list.php?i=list');
  }

  async getAreas(): Promise<MealDbResponse<Area>> {
    return this.fetchFromApi<MealDbResponse<Area>>('/list.php?a=list');
  }

  async getCategories(): Promise<MealDbResponse<Category>> {
    return this.fetchFromApi<MealDbResponse<Category>>('/list.php?c=list');
  }

  getByFilter(type: 'i' | 'a' | 'c', value: string) {
    return this.fetchFromApi(`/filter.php?${type}=${value}`);
  }

  async getRecipeById(id: string): Promise<{ meals: IMeal[] }> {
    return this.fetchFromApi(`/lookup.php?i=${id}`);
  }
}
