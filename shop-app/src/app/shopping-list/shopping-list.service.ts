import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredinet.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() { }

  ingredientChanged=new EventEmitter<Ingredient[]>();

 private ingredinets:Ingredient[]=[
    new Ingredient('Apel',10),
    new Ingredient('banan',5)
  ];

  getIngredinets(){
    return this.ingredinets.slice();
  }

  ingredientAdded(ingredient:Ingredient){
    this.ingredinets.push(ingredient);
    this.ingredientChanged.emit(this.ingredinets.slice());
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredinets.push(...ingredients);
    this.ingredientChanged.emit(this.ingredinets);
  }
}
