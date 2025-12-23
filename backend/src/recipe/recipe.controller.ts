import { Controller, Get, Query, Param } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  getAll() {
    return this.recipeService.getAll();
  }

  @Get('by-ingredient')
  getByIngredient(@Query('i') i: string) {
    return this.recipeService.getByIngredient(i);
  }

  @Get('by-category')
  getByCategory(@Query('c') c: string) {
    return this.recipeService.getByCategory(c);
  }

  @Get('by-country')
  getByArea(@Query('a') a: string) {
    return this.recipeService.getByArea(a);
  }

  @Get('by-letter')
  getByFirstLetter(@Query('f') f: string) {
    return this.recipeService.getByFirstLetter(f);
  }

  @Get(':id')
  getRecipeById(@Param('id') id: string) {
    return this.recipeService.getRecipeById(id);
  }
}
