import { Controller, Get, Query, Param } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  getRecipes(
    @Query('i') ingredient?: string,
    @Query('a') area?: string,
    @Query('c') category?: string,
    @Query('s') search?: string,
  ) {
    if (ingredient) {
      return this.recipeService.getByIngredient(ingredient);
    }
    if (area) {
      return this.recipeService.getByArea(area);
    }
    if (category) {
      return this.recipeService.getByCategory(category);
    }
    if (search) {
      return this.recipeService.searchByName(search);
    }
    return this.recipeService.getAll();
  }

  @Get(':id')
  getRecipeById(@Param('id') id: string) {
    return this.recipeService.getRecipeById(id);
  }
}
