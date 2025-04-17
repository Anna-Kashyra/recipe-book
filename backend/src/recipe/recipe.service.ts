import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecipeService {
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    // this.baseUrl = this.configService.get<string>('RECIPE_API_BASE_URL')!;
    this.baseUrl = `https://www.themealdb.com/api/json/v1/1`;
  }

  async getByIngredient(ingredient: string) {
    const url = `${this.baseUrl}/filter.php?i=${ingredient}`;
    const response = await axios.get(url);
    return response.data;
  }

  async getByArea(area: string) {
    const url = `${this.baseUrl}/filter.php?a=${area}`;
    const response = await axios.get(url);
    return response.data;
  }

  async getByCategory(category: string) {
    const url = `${this.baseUrl}/filter.php?c=${category}`;
    const response = await axios.get(url);
    return response.data;
  }

  async searchByName(search: string) {
    const url = `${this.baseUrl}/search.php?s=${search}`;
    const response = await axios.get(url);
    return response.data;
  }

  async getAll() {
    const url = `${this.baseUrl}/search.php?s=`;
    const response = await axios.get(url);
    return response.data;
  }

  async getByFirstLetter(letter: string) {
    const url = `${this.baseUrl}/search.php?f=${letter}`;
    const response = await axios.get(url);
    return response.data;
  }

  async getRecipeById(id: string) {
    const url = `${this.baseUrl}/lookup.php?i=${id}`;
    const response = await axios.get(url);
    return response.data;
  }
}
