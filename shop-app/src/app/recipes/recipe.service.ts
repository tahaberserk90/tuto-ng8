import { Injectable} from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredinet.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private slService:ShoppingListService) { }

  recipeChanged=new Subject<Recipe[]>();

  // private recipes : Recipe[]=[
  //   new Recipe(
  //     'recipe 1',
  //   'this recipe 1',
  //   'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_760,h_950/k%2FPhoto%2FRecipes%2F2019-11-recipe-easy-sheet-pan-nachos%2F2019-10-21_Kitchn89063_Easy-Sheet-Pan-Chicken-Nachos'
  //   ,[
  //     new Ingredient('meat',1),
  //     new Ingredient('pasta',5)
  //   ]),
  //   new Recipe('recipe 2'
  //   ,'this recipe 2',
  //   'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_760,h_950/k%2FPhoto%2FRecipes%2F2019-11-recipe-easy-sheet-pan-nachos%2F2019-10-21_Kitchn89063_Easy-Sheet-Pan-Chicken-Nachos'
  //   ,[
  //     new Ingredient('meat',1),
  //     new Ingredient('pasta',5)
  //   ])
  // ];

  recipes : Recipe[]=[];
  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id:number){
    return this.recipes[id];
  }

  setRecipes(recipesData:Recipe[]){
    this.recipes=recipesData;
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientToShop(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
