import { Controller, Get, Query, Param } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import {
  Area,
  Category,
  IMeal,
  Ingredient,
  MealDbResponse,
} from '../models/IMeal';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  getAll(): Promise<{ meals: IMeal[] }> {
    return this.recipeService.getAll();
  }

  @Get('get-by-letter')
  getMealsByLetter(@Query('f') f: string): Promise<{ meals: IMeal[] }> {
    return this.recipeService.getMealsByLetter(f);
  }

  @Get('get-by-category')
  getMealsByCategory(@Query('c') c: string): Promise<{ meals: IMeal[] }> {
    return this.recipeService.getMealsByCategory(c);
  }

  @Get('get-by-area')
  getMealsByArea(@Query('a') a: string): Promise<{ meals: IMeal[] }> {
    return this.recipeService.getMealsByArea(a);
  }

  @Get('get-by-ingredient')
  getMealsByIngredient(@Query('i') i: string): Promise<{ meals: IMeal[] }> {
    return this.recipeService.getMealsByIngredient(i);
  }

  @Get('ingredients')
  getIngredients(): Promise<MealDbResponse<Ingredient>> {
    return this.recipeService.getIngredients();
  }

  @Get('areas')
  getAreas(): Promise<MealDbResponse<Area>> {
    return this.recipeService.getAreas();
  }

  @Get('categories')
  getCategories(): Promise<MealDbResponse<Category>> {
    return this.recipeService.getCategories();
  }

  @Get('filter')
  getByFilter(
    @Query('type') type: 'i' | 'a' | 'c',
    @Query('value') value: string,
  ) {
    return this.recipeService.getByFilter(type, value);
  }

  @Get('multi-filter')
  getByMultipleFilters(
    @Query('area') area?: string,
    @Query('category') category?: string,
    @Query('ingredient') ingredient?: string,
  ) {
    return this.recipeService.getByMultipleFilters({
      area,
      category,
      ingredient,
    });
  }
  @Get(':id')
  getRecipeById(@Param('id') id: string): Promise<{ meals: IMeal[] }> {
    return this.recipeService.getRecipeById(id);
  }
}
