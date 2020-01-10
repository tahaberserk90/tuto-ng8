import { Injectable} from '@angular/core';
import { Ingredient } from '../shared/ingredinet.model';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() { }

  ingredientChanged=new Subject<Ingredient[]>();
  stratEditing=new Subject<number>();

 private ingredinets:Ingredient[]=[
    new Ingredient('Apel',10),
    new Ingredient('banan',5)
  ];

  getIngredinets(){
    return this.ingredinets.slice();
  }

  getIngredient(index:number){
    return this.ingredinets[index];
  }

  ingredientAdded(ingredient:Ingredient){
    this.ingredinets.push(ingredient);
    this.ingredientChanged.next(this.ingredinets.slice());
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredinets.push(...ingredients);
    this.ingredientChanged.next(this.ingredinets);
  }

  updateIngredient(index:number,newIngredient:Ingredient){
    this.ingredinets[index]=newIngredient;
    this.ingredientChanged.next(this.ingredinets.slice());
  }

  deleteIngredient(index:number){
    this.ingredinets.splice(index,1);
    this.ingredientChanged.next(this.ingredinets.slice());
  }
}
