import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn:'root'
})
export class RecipeResolverService implements  Resolve<Recipe[]>{
  constructor(private dsServcie:DataStorageService,private recipeService:RecipeService){}
 public  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes=this.recipeService.getRecipes();
    if(recipes.length === 0){
      return this.dsServcie.fetchRecipes();
    }else {
      return recipes;
    }

  }
}
