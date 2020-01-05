import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredinet.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredinets:Ingredient[];

  constructor(private shopServ:ShoppingListService) { }

  ngOnInit() {
    this.ingredinets=this.shopServ.getIngredinets();
    this.shopServ.ingredientChanged.subscribe(
      (ingredinets:Ingredient[])=>{
        this.ingredinets=ingredinets;
      }
    )
  }

  onIngredientAdded(ingredient:Ingredient){
    this.ingredinets.push(ingredient);
  }

}
