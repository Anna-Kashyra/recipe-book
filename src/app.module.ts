import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RecipeModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RecipeModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

